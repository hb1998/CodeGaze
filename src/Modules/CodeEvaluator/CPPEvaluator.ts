import { FUNCTION_NAME, IInputOutput, IParamType, ParamType } from '../../types/Evaluator.types';
import { ProgrammingLanguages } from '../common/CodeEditor/ProgrammingLanguages';
import { separator } from './CodeEvaluator';

export class CPPEvaluator {
    inputTypes: IParamType[];
    outputType: IParamType;
    languageId: string = ProgrammingLanguages.cpp.id.toString();

    constructor(inputTypes: IParamType[], outputType: IParamType) {
        this.inputTypes = inputTypes;
        this.outputType = outputType;
    }

    getResult(outputArray: string[], testCases: IInputOutput[]): boolean[] {
        return testCases.map((testCase, index) => {
            return outputArray[index] === '1';
        })
    }

    getEvaluateTemplate(code: string, testCases: IInputOutput[]) {
        return `
        #include <algorithm>
        #include <string>
        ${code}
       int main() {
            ${testCases
                .map((testCase) => {
                    return `${this.getCompareCode(testCase)}
                    cout <<"${separator}" << endl;
                    `
                })
                .join('\n')}
                return 0;
        }

        // utils for comparing test cases.
        
        bool isNumberArrayEqual(const std::vector<int>& vec1, const std::vector<int>& vec2) {
            return vec1.size() == vec2.size() && std::equal(vec1.begin(), vec1.end(), vec2.begin());
        }

        bool isStringArrayEqual(const std::vector<std::string>& arr1, const std::vector<std::string>& arr2) {
            return arr1.size() == arr2.size() && std::equal(arr1.begin(), arr1.end(), arr2.begin());
        }

      `;
    }

    private getCompareCode = (testCase: IInputOutput) => {
        const outputParam = this.getCodeForParameter(this.outputType.type, testCase.output);
        switch (this.outputType.type) {
            case ParamType.NUMBER:
                return `cout << (${FUNCTION_NAME}(${this.parseTestCase(testCase)}) == ${outputParam}) << endl;`
            case ParamType.ARRAY_OF_NUMBER:
                return `cout << isNumberArrayEqual(${FUNCTION_NAME}(${this.parseTestCase(testCase)})) << endl;`
            case ParamType.ARRAY_OF_STRING:
                return `cout << isStringArrayEqual(${FUNCTION_NAME}(${this.parseTestCase(testCase)})) << endl;`
            default:
                return `cout << (${FUNCTION_NAME}(${this.parseTestCase(testCase)}) == ${outputParam}) << endl;`

        }
    }

    private parseTestCase = (testCase: IInputOutput) => {
        return `${testCase.input.map((caseItem, index) => {
            return this.getCodeForParameter(this.inputTypes[index].type, caseItem)
        }).join(',')}`;
    }

    private getCodeForParameter(type: ParamType, caseItem: string) {
        switch (type) {
            case ParamType.NUMBER:
                return caseItem;

            case ParamType.ARRAY_OF_NUMBER: {
                const arrayLiteral = this.getArrayLiteral(caseItem);
                return `${arrayLiteral}`;
            }
            case ParamType.ARRAY_OF_STRING: {
                const arrayLiteral = this.getArrayLiteral(caseItem);
                return `${arrayLiteral}`;
            }
            case ParamType.STRING: {
                return `"${caseItem}"`;
            }
            case ParamType.BOOLEAN: {
                return caseItem;
            }
            default:
                return caseItem;

        }
    }

    private getArrayLiteral = (array: string) => {
        return `{${array.replace(/[\\[\]]/g, '')}}`;
    }

}
