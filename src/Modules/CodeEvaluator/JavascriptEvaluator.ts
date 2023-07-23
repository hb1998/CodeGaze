import { CodeOutput, CompilationStatus, FUNCTION_NAME, IInputOutput, IParamType, ParamType } from '../../types/Evaluator.types';
import { CandidateAssessmentAPIService } from '../CandidateAssessment/services/CandidateAssessment.API';
import { ProgrammingLanguages } from '../common/CodeEditor/ProgrammingLanguages';
import EvaluatorUtils from './Evaluator.utils';
import lodashIsEqual from 'lodash.isequal'

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
        const evaluateTemplate = this.getEvaluateTemplate(code, [testCases[1]]);
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
                     console.log(${FUNCTION_NAME}(${EvaluatorUtils.getInputArgs(testCase, this.inputTypes)}));
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
            } else if (this.outputType.type === ParamType.OBJECT || this.outputType.type === ParamType.ARRAY_OF_OBJECT) {
                return JSON.stringify(result) === JSON.stringify(expected);
            } else {
                return result === expected;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

}
