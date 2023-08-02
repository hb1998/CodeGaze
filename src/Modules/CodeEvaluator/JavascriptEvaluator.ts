import { CodeOutput, CompilationStatus, FUNCTION_NAME, IInputOutput, IParamType, ParamType } from '../../types/Evaluator.types';
import { CandidateAssessmentAPIService } from '../CandidateAssessment/services/CandidateAssessment.API';
import { ProgrammingLanguages } from '../common/CodeEditor/ProgrammingLanguages';
import lodashIsEqual from 'lodash.isequal'
import lodashIsEqualWith from 'lodash.isequalwith'

const separator = '##--------##';
export class JavascriptEvaluator {
    inputTypes: IParamType[];
    outputType: IParamType;

    constructor(inputTypes: IParamType[], outputType: IParamType) {
        this.inputTypes = inputTypes;
        this.outputType = outputType;
    }
    async evaluate(code: string, testCases: IInputOutput[]): Promise<boolean[]> {
        const evaluateTemplate = this.getEvaluateTemplate(code, testCases);
        try {
            const output = await CandidateAssessmentAPIService.runCode(
                evaluateTemplate,
                ProgrammingLanguages.javaScript.id.toString(),
            );
            if (output.status.id === CompilationStatus.ACCEPTED) {
                const outputArray = output.stdout
                    .split(separator)
                    .map((output) => output.replace(/\n/g, ''))
                    .filter((output) => output);
                return testCases.map((testCase, index) => {
                    return this.isEqual(outputArray[index], testCase.output);
                });
            }
            return testCases.map(() => false);
        } catch (error) {
            console.log(error);
        }
        return [true];
    }

    async evaluateAndReturnOutput(code: string, testCases: IInputOutput[]): Promise<CodeOutput> {
        const evaluateTemplate = this.getEvaluateTemplate(code, [testCases[0]]);
        try {
            const output = await CandidateAssessmentAPIService.runCode(
                evaluateTemplate,
                ProgrammingLanguages.javaScript.id.toString(),
            );
            return output;
        } catch (error) {
            console.log(error);
        }
    }

    private getEvaluateTemplate(code: string, testCases: IInputOutput[]) {
        return `
            ${code}
            function evaluate() {
                ${testCases
                .map((testCase) => {
                    return `
                     console.log(JSON.stringify(${FUNCTION_NAME}(${this.getInputArgs(testCase, this.inputTypes)})));
                     console.log('${separator}');
                   `;
                })
                .join('\n')}
            }
            evaluate();
        `;
    }

    private isEqual(result: string, expected: string) {
        try {
            if ([ParamType.ARRAY_OF_STRING, ParamType.ARRAY_OF_NUMBER].includes(this.outputType.type)) {
                return lodashIsEqual(JSON.parse(result), JSON.parse(expected));
            } else if (this.outputType.type === ParamType.OBJECT) {
                return lodashIsEqual(result, expected);
            } else if (this.outputType.type === ParamType.ARRAY_OF_OBJECT) {
                const parseResult = (result: string) => JSON.parse(result).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
                const resultArray = parseResult(result)
                const expectedArray = parseResult(expected)
                return lodashIsEqualWith(resultArray, expectedArray, (obj1, obj2) => {
                    if (lodashIsEqual(obj1, obj2)) {
                        return true;
                    }
                    return false;
                })
            } else {
                return result === expected;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    private getInputArgs(testCase: IInputOutput, inputTypes: IParamType[]) {
        return testCase.input.map((arg, index) => {
            if (inputTypes[index].type === 'string') {
                return `'${arg}'`
            } else if (['object', 'arrayOfObject'].includes(inputTypes[index].type)) {
                return JSON.stringify(JSON.parse(arg))
            } else {
                return `${arg}`
            }
        }).join(', ')
    }

}
