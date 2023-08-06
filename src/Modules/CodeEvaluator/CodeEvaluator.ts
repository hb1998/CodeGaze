import { CodeOutput, IInputOutput, IParamType } from '../../types/Evaluator.types';
import { languageNameType } from '../common/CodeEditor/ProgrammingLanguages';
import { JavaEvaluator } from './Java/JavaEvaluator';
import { JavascriptEvaluator } from './JavascriptEvaluator';
import { PythonEvaluator } from './PythonEvaluator';

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

    evaluate(code: string, testCases: IInputOutput[]): Promise<boolean[]> {
        return this.evaluator?.evaluate(code, testCases);
    }

    runAndEvaluateCode(code: string, testCases: IInputOutput[]): Promise<CodeOutput> {
        return this.evaluator?.evaluateAndReturnOutput(code, testCases);
    }
}
