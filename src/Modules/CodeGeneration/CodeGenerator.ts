import { CHandler } from './CHandler';
import { CPPHandler } from './CPPHandler';
import { JavaHandler } from './JavaHandler';
import { JavascriptHandler } from './JavascriptHandler';
import { PythonHandler } from './PythonHandler';
import { languageNameType } from '../common/CodeEditor/Editor';

// export enum Language {
//     JavaScript = 'javascript',
//     Python = 'python',
//     Java = 'java',
//     C = 'c',
//     CPP = 'c++',
// }

export const FUNCTION_NAME = 'solve';

export interface IParamType {
    type: 'string' | 'number' | 'arrayOfString' | 'arrayOfNumber' | 'object' | 'arrayOfObject' | 'boolean';
    name: string;
    objectStructure?: string;
}

export class CodeGenerator {
    language: languageNameType;
    inputTypes: IParamType[];
    outputType: IParamType;
    generator: JavascriptHandler | PythonHandler | JavaHandler | CHandler | CPPHandler | null;

    constructor(language: languageNameType, inputTypes: IParamType[], outputType: IParamType) {
        this.language = language;
        this.inputTypes = inputTypes;
        this.outputType = outputType;
        this.generator = this.getGenerator();
    }

    private getGenerator() {
        switch (this.language) {
            case 'Javascript':
                return new JavascriptHandler(this.inputTypes, this.outputType);
            case 'Python':
                return new PythonHandler(this.inputTypes, this.outputType);
            case 'Java':
                return new JavaHandler(this.inputTypes, this.outputType);
            case 'C':
                return new CHandler(this.inputTypes, this.outputType);
            case 'C++':
                return new CPPHandler(this.inputTypes, this.outputType);
            default:
                return null;
        }
    }

    generateStarterCode(): string | undefined {
        return this.generator?.generate();
    }
}

console.log('test');
// Example inputs
