import { CodeOutput, CompilationStatus, FUNCTION_NAME, IInputOutput, IParamType } from '../../types/Evaluator.types';
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
                    return outputArray[index].trim() === testCase.output;
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

      public class Main {

        ${code}

        public static void main(String[] args) {
            ${testCases
                .map((testCase) => {
                    return `
                System.out.println(${FUNCTION_NAME}(${testCase.input.join(', ')}));
                `;
                })
                .join('\n')}
        }
    }
      `;
    }
}
