import { FUNCTION_NAME, IParamType } from './CodeGenerator';
import { LanguageHandler } from './Handler.types';

export class JavaHandler implements LanguageHandler {
    inputTypes: IParamType[];
    outputType: IParamType;

    constructor(inputTypes: IParamType[], outputTypes: IParamType) {
        this.inputTypes = inputTypes;
        this.outputType = outputTypes;
    }

    generate() {
        let functionTemplate = `
public class Main {
    public static ${this.generateOutputList()} ${FUNCTION_NAME}(${this.generateInputList()}) {
        // TODO: Implement the function logic here
        // Return the output
        return output;
    }
    public static void main(String[] args) {
        // Call the solve function with sample input and print the output
    }
}`;

        // Replace the placeholders in the function template with the input parameters
        functionTemplate = functionTemplate.replace(/#output/g, this.outputType.name);

        return functionTemplate;
    }

    private generateInputList() {
        return this.inputTypes
            .map((input) => {
                if (input.type === 'arrayOfString') {
                    return `IParamType ${input.name}`;
                } else if (input.type === 'arrayOfNumber') {
                    return `int[] ${input.name}`;
                } else if (input.type === 'object') {
                    return `${input.objectStructure} ${input.name}`;
                } else if (input.type === 'arrayOfObject') {
                    return `List<${input.objectStructure}> ${input.name}`;
                } else if (input.type === 'number') {
                    return `int ${input.name}`;
                } else {
                    return `${input.type} ${input.name}`;
                }
            })
            .join(', ');
    }
    private generateOutputList() {
        switch (this.outputType.type) {
            case 'number':
                return 'int';
            case 'arrayOfNumber':
                return `int[]`;
            case 'arrayOfString':
                return `String[]`;
            case 'arrayOfObject':
                return `Object[]`;
            case 'boolean':
                return `boolean`;
            case 'string':
                return `String`;
        }
    }
}
