import { IParamType } from '../../types/Evaluator.types';

export interface LanguageHandler {
    inputTypes: IParamType[];
    outputType: IParamType;
    generate: () => string;
}
