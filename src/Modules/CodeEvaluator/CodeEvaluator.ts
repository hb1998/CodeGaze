import { IInputOutput, IParamType } from '../../types/Evaluator.types';
import { languageNameType } from '../common/CodeEditor/Editor';
import { JavascriptEvalutor } from './JavascriptEvaluator';


export class CodeEvaluator {
    language: languageNameType;
    inputTypes: IParamType[];
    outputType: IParamType;
    evaluator: JavascriptEvalutor;

    constructor(language: languageNameType, inputTypes: IParamType[], outputType: IParamType) {
        this.language = language;
        this.inputTypes = inputTypes;
        this.outputType = outputType;
        this.evaluator = this.getEvaluator();
    }

    private getEvaluator() {
        switch (this.language) {
            case 'Javascript':
                return new JavascriptEvalutor(this.inputTypes, this.outputType);
        }
    }

    evaluate(code: string, testCases: IInputOutput[]): Promise<boolean[]> {
        return this.evaluator?.evaluate(code, testCases);
    }
}
