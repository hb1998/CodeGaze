import { CodeOutput, CompilationStatus, FUNCTION_NAME, IInputOutput, IParamType, ParamType } from '../../types/Evaluator.types';
import { CandidateAssessmentAPIService } from '../CandidateAssessment/services/CandidateAssessment.API';
import { ProgrammingLanguages } from '../common/CodeEditor/ProgrammingLanguages';

const separator = '##---##';
export class JavaEvaluator {
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
                ProgrammingLanguages.java.id.toString(),
            );
            if (output.status.id === CompilationStatus.ACCEPTED) {
                const outputArray = output.stdout
                    .split(separator)
                    .map((output) => output.replace(/\n/g, ''))
                    .filter((output) => output);
                return testCases.map((testCase, index) => {
                    return outputArray[index] === 'true';
                });
            }
            return null;
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
                ProgrammingLanguages.java.id.toString(),
            );
            return output;
        } catch (error) {
            console.log(error);
        }
    }

    private getEvaluateTemplate(code: string, testCases: IInputOutput[]) {
        return `
      import java.util.*;
        
      public class Main {

        ${code}

        public static void main(String[] args) {
            ${testCases
                .map((testCase) => {
                    return `${this.getCompareCode(testCase)}
                    System.out.println("${separator}");
                    `

                })
                .join('\n')}
        }
    }
      `;
    }

    private getCompareCode = (testCase: IInputOutput) => {
        const outputParam = this.getCodeForParameter(this.outputType.type, testCase.output);
        switch (this.outputType.type) {
            case ParamType.NUMBER:
                return `System.out.println(${FUNCTION_NAME}(${this.parseTestCase(testCase)}) == ${outputParam});`;
            case ParamType.ARRAY_OF_NUMBER:
            case ParamType.ARRAY_OF_STRING:
                return `System.out.println(Arrays.equals(${FUNCTION_NAME}(${this.parseTestCase(testCase)}), ${outputParam}));`;
            case ParamType.STRING:
                return `System.out.println(${FUNCTION_NAME}(${this.parseTestCase(testCase)}).equals("${outputParam}"));`;
            case ParamType.BOOLEAN:
                return `System.out.println(${FUNCTION_NAME}(${this.parseTestCase(testCase)}) == ${outputParam});`;
            default:
                return `System.out.println(${FUNCTION_NAME}(${this.parseTestCase(testCase)}) == ${outputParam});`;
        }
    }

    private parseTestCase = (testCase: IInputOutput) => {
        return `
        ${testCase.input.map((caseItem, index) => {
            return this.getCodeForParameter(this.inputTypes[index].type, caseItem);
        }).join(', ')}
        `;
    }

    private getArrayLiteral = (array: string) => {
        return `{${array.replace(/[\\[\]]/g, '')}}`;
    }

    private getCodeForParameter(type: ParamType, caseItem: string) {
        switch (type) {
            case ParamType.NUMBER:
                return caseItem;

            case ParamType.ARRAY_OF_NUMBER: {
                const arrayLiteral = this.getArrayLiteral(caseItem);
                return `new int[] ${arrayLiteral}`;
            }
            case ParamType.ARRAY_OF_STRING: {
                const arrayLiteral = this.getArrayLiteral(caseItem);
                return `new String[] ${arrayLiteral}`;
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
}
