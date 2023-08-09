import { CodeOutput, CompilationStatus, FUNCTION_NAME, IEvaluatorResult, IInputOutput, IParamType, ParamType, RUNTIME_ERRORS } from '../../types/Evaluator.types';
import { CandidateAssessmentAPIService } from '../CandidateAssessment/services/CandidateAssessment.API';
import { ProgrammingLanguages } from '../common/CodeEditor/ProgrammingLanguages';
import { separator } from './CodeEvaluator';

export class PythonEvaluator {
    inputTypes: IParamType[];
    outputType: IParamType;
    languageId = ProgrammingLanguages.python.id.toString()

    constructor(inputTypes: IParamType[], outputType: IParamType) {
        this.inputTypes = inputTypes;
        this.outputType = outputType;
    }

    async evaluate(code: string, testCases: IInputOutput[]): Promise<IEvaluatorResult> {
        const evaluateTemplate = this.getEvaluateTemplate(code, testCases);
        const evaluatorResult: IEvaluatorResult = {
            result: [],
            output: '',
            status: CompilationStatus.ACCEPTED,
            memory: 0,
            time: 'NA',
        }
        try {
            const output = await CandidateAssessmentAPIService.runCode(
                evaluateTemplate,
                ProgrammingLanguages.python.id.toString(),
            );
            evaluatorResult.status = output.status.id;
            evaluatorResult.output = output.stderr;
            evaluatorResult.memory = output.memory;
            evaluatorResult.time = output.time;
            if (output.status.id === CompilationStatus.ACCEPTED) {
                const outputArray = output.stdout
                    .split(separator)
                    .map((output) => output.replace(/\n/g, ''))
                    .filter((output) => output);
                evaluatorResult.result = testCases.map((testCase, index) => outputArray[index] === 'True');
            }
            if (RUNTIME_ERRORS.includes(output.status.id)) {
                evaluatorResult.result = testCases.map(() => false);
            }
        } catch (error) {
            console.log(error);
        }
        return evaluatorResult;
    }

    getResult(outputArray: string[], testCases: IInputOutput[]): boolean[] {
        return testCases.map((testCase, index) => outputArray[index] === 'True');
    }

    getEvaluateTemplate(code: string, testCases: IInputOutput[]) {
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
