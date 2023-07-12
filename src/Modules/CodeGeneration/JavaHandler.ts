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
    public static ${this.outputType.type} ${FUNCTION_NAME}(${this.generateParameterList()}) {
        // TODO: Implement the function logic here
        // Return the output
    }
    public static void main(String[] args) {
        // Call the solve function with sample input and print the output
        System.out.println(solve(0, 0));
    }
}`;

        // Replace the placeholders in the function template with the input parameters
        functionTemplate = functionTemplate.replace(/#output/g, this.outputType.name);

        return functionTemplate;
    }

    private generateParameterList() {
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
                } else {
                    return `${input.type} ${input.name}`;
                }
            })
            .join(', ');
    }
}
