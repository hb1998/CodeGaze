import { CHandler } from "./CHandler";
import { CPPHandler } from "./CPPHandler";
import { JavaHandler } from "./JavaHandler";
import { JavascriptHandler } from "./JavascriptHandler";
import { PythonHandler } from "./PythonHandler";

export enum Language {
    JavaScript = 'javascript',
    Python = 'python',
    Java = 'java',
    C = 'c',
    CPP = 'c++',
}
export const FUNCTION_NAME = 'solve'

export interface IInputType {
    type: 'string' | 'number' | 'arrayOfString' | 'arrayOfNumber' | 'object' | 'arrayOfObject' | 'boolean';
    name: string;
    objectStructure?: string;
}

export class CodeGenerator {
    language: Language;
    inputTypes: IInputType[];
    outputTypes: string[];
    generator: JavascriptHandler | PythonHandler | JavaHandler | CHandler | CPPHandler | null;

    constructor(language: Language, inputTypes: IInputType[], outputTypes: string[]) {
        this.language = language;
        this.inputTypes = inputTypes;
        this.outputTypes = outputTypes;
        this.generator = this.getGenerator();
    }

    private getGenerator() {
        switch (this.language) {
            case Language.JavaScript:
                return new JavascriptHandler(this.inputTypes, this.outputTypes);
            case Language.Python:
                return new PythonHandler(this.inputTypes, this.outputTypes);
            case Language.Java:
                return new JavaHandler(this.inputTypes, this.outputTypes);
            case Language.C:
                return new CHandler(this.inputTypes, this.outputTypes);
            case Language.CPP:
                return new CPPHandler(this.inputTypes, this.outputTypes);
            default:
                return null
        }
    }

    generateStarterCode(): string | undefined {
        return this.generator?.generate?.();
    }


    static generateJavaCode(inputTypes: IInputType[], outputTypes: string[]) {
        let functionTemplate = `public static ${outputTypes[0]} functionName(${generateParameterList()}) {
            // TODO: Implement the function logic here
    
            // Return the output
            return output;
        }`;

        // Replace the placeholders in the function template with the input parameters
        functionTemplate = functionTemplate.replace('functionName', 'yourFunctionName')
            .replace('output', `output${outputTypes.length > 1 ? '[]' : ''}`);

        return functionTemplate;

        function generateParameterList() {
            return inputTypes.map(input => {
                if (input.type === 'arrayOfString') {
                    return `String[] ${input.name}`;
                } else if (input.type === 'arrayOfNumber') {
                    return `int[] ${input.name}`;
                } else if (input.type === 'object') {
                    return `${input.objectStructure} ${input.name}`;
                } else if (input.type === 'arrayOfObject') {
                    return `List<${input.objectStructure}> ${input.name}`;
                } else {
                    return `${input.type} ${input.name}`;
                }
            }).join(', ');
        }

    }

}
console.log('test');
// Example inputs
