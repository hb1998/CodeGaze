import { CompilationStatus, FUNCTION_NAME, IInputOutput, IParamType } from "../../types/Evaluator.types";
import { CandidateAssessmenmtAPIService } from "../CandidateAssessment/services/CandidateAssessment.API";
import { ProgrammingLanguages } from "../common/CodeEditor/ProgrammingLanguages";


const separator = '##---##'
export class JavascriptEvalutor {
    inputTypes: IParamType[];
    outputType: IParamType;

    constructor(inputTypes: IParamType[], outputType: IParamType) {
        this.inputTypes = inputTypes;
        this.outputType = outputType;
    }
    async evaluate(code: string, testCases: IInputOutput[]): Promise<boolean[]> {
        const evaluateTemplate = `
            ${code}

            function evaluate() {
                ${testCases.map((testCase) => {
            return `
                   console.log(${FUNCTION_NAME}(${testCase.input.join(', ')}));
                   console.log('${separator}');
                   `
        }).join('\n')}
            }
            evaluate();
        `
        try {
            const output = await CandidateAssessmenmtAPIService.runCode(evaluateTemplate, ProgrammingLanguages.javaScript.id.toString());
            if (output.status.id === CompilationStatus.ACCEPTED) {
                const outputArray = output.stdout
                    .split(separator)
                    .map(output => output.replace(/\n/g, ''))
                    .filter((output) => output);
                return testCases.map((testCase, index) => {
                    return outputArray[index].trim() === testCase.output
                }
                )
            }
            return null;
        } catch (error) {
            console.log(error)
        }
        return [true]

    }


}
