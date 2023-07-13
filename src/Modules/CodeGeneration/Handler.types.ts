import { IParamType } from './CodeGenerator';

export interface LanguageHandler {
    inputTypes: IParamType[];
    outputType: IParamType;
    generate: () => string;
}
