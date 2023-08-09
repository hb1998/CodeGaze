import { CodeOutput, CompilationStatus, IEvaluatorResult, IInputOutput, IParamType, RUNTIME_ERRORS } from '../../types/Evaluator.types';
import { CandidateAssessmentAPIService } from '../CandidateAssessment/services/CandidateAssessment.API';
import { languageNameType } from '../common/CodeEditor/ProgrammingLanguages';
import { JavaEvaluator } from './Java/JavaEvaluator';
import { JavascriptEvaluator } from './JavascriptEvaluator';
import { PythonEvaluator } from './PythonEvaluator';

export const separator = '##---##';

export class CodeEvaluator {
    language: languageNameType;
    inputTypes: IParamType[];
    outputType: IParamType;
    evaluator: JavascriptEvaluator | JavaEvaluator | PythonEvaluator;

    constructor(language: languageNameType, inputTypes: IParamType[], outputType: IParamType) {
        this.language = language;
        this.inputTypes = inputTypes;
        this.outputType = outputType;
        this.evaluator = this.getEvaluator();
    }

    private getEvaluator(): JavascriptEvaluator | JavaEvaluator | PythonEvaluator {
        switch (this.language) {
            case 'Javascript':
                return new JavascriptEvaluator(this.inputTypes, this.outputType);
            case 'Java':
                return new JavaEvaluator(this.inputTypes, this.outputType);
            case 'Python':
                return new PythonEvaluator(this.inputTypes, this.outputType);
        }
    }

    async evaluate(code: string, testCases: IInputOutput[]): Promise<IEvaluatorResult> {
        const evaluateTemplate = this.evaluator.getEvaluateTemplate(code, testCases);
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
                this.evaluator.languageId,
            );
            evaluatorResult.status = output.status.id;
            evaluatorResult.memory = output.memory;
            evaluatorResult.time = output.time;
            if (output.status.id === CompilationStatus.ACCEPTED) {
                const outputArray = output.stdout
                .split(separator)
                .map((output) => output.replace(/\n/g, ''))
                .filter((output) => output);
                evaluatorResult.result = this.evaluator.getResult(outputArray, testCases);
            }
            if (RUNTIME_ERRORS.includes(output.status.id)) {
                evaluatorResult.output = output.stderr;
                evaluatorResult.result = testCases.map(() => false);
            }
        } catch (error) {
            console.log(error);
        }
        return evaluatorResult;
    }

    async runAndEvaluateCode(code: string, testCases: IInputOutput[]): Promise<CodeOutput> {
        const evaluateTemplate = this.evaluator.getEvaluateTemplate(code, [testCases[0]]);
        try {
            const output = await CandidateAssessmentAPIService.runCode(
                evaluateTemplate,
                this.evaluator.languageId,
            );
            return output;
        } catch (error) {
            console.log(error);
        }
    }
}
