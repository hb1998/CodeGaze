import { CodeOutput, CompilationStatus, FUNCTION_NAME, IInputOutput, IParamType, ParamType } from '../../types/Evaluator.types';
import { CandidateAssessmentAPIService } from '../CandidateAssessment/services/CandidateAssessment.API';
import { ProgrammingLanguages } from '../common/CodeEditor/ProgrammingLanguages';

const separator = '##---##';
export class PythonEvaluator {
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
                ProgrammingLanguages.python.id.toString(),
            );
            if (output.status.id === CompilationStatus.ACCEPTED) {
                const outputArray = output.stdout
                    .split(separator)
                    .map((output) => output.replace(/\n/g, ''))
                    .filter((output) => output);
                return testCases.map((testCase, index) => outputArray[index] === 'True');
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
                ProgrammingLanguages.python.id.toString(),
            );
            return output;
        } catch (error) {
            console.log(error);
        }
    }
    private getEvaluateTemplate(code: string, testCases: IInputOutput[]) {
        return `${code}
def evaluate():
    ${testCases
                .map((testCase) => {
                    return `
    print(${FUNCTION_NAME}(${this.getInputArgs(testCase, this.inputTypes)}) == ${this.getOutputArgs(testCase.output, this.outputType)})
    print('${separator}')
    `;
                })
                .join('\n')}
    
evaluate()
`;
    }

    private getInputArgs(testCase: IInputOutput, inputTypes: IParamType[]) {
        return testCase.input.map((arg, index) => {
            if (inputTypes[index].type === ParamType.STRING) {
                return `'${arg}'`
            } else if ([ParamType.ARRAY_OF_OBJECT, ParamType.OBJECT].includes(inputTypes[index].type)) {
                return `${arg}`
            } else {
                return `${arg}`
            }
        }).join(', ')
    }

    private getOutputArgs(output: string, outputType: IParamType) {
        if (outputType.type === 'string') {
            return `'${output}'`
        } else if ([ParamType.ARRAY_OF_OBJECT, ParamType.OBJECT].includes(outputType.type)) {
            return `${output}`
        } else {
            return `${output}`
        }
    }
}
