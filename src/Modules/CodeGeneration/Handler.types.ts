import { IInputType } from "./CodeGenerator";

export interface LanguageHandler {
    inputTypes: IInputType[];
    outputTypes: string[];
    generate: () => string;

}