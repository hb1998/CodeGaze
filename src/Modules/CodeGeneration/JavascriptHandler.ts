import { FUNCTION_NAME, IInputType } from "./CodeGenerator";
import { LanguageHandler } from "./Handler.types";

export class JavascriptHandler implements LanguageHandler {
    inputTypes: IInputType[];
    outputTypes: string[];

    constructor(inputTypes: IInputType[], outputTypes: string[]) {
        this.inputTypes = inputTypes;
        this.outputTypes = outputTypes;
    }
    generate(): string {
        let functionTemplate = `function ${FUNCTION_NAME}(${this.generateParameterList()}) {
    // TODO: Implement the function logic here

    // Return the output
    return output;
}`;

        // Create an array of output variable names based on output types
        const outputVariables = this.outputTypes.map((_type, index) => `output${index + 1}`);

        // Replace the placeholders in the function template with the input and output variables
        functionTemplate = functionTemplate.replace('functionName', 'yourFunctionName').replace('output', outputVariables.join(', '));

        return functionTemplate;
    }

    private generateParameterList(): string {
        return this.inputTypes.map((input) => `${input.type}${input.objectStructure ? ` ${input.objectStructure}` : ''} ${input.name}`).join(', ');
    }
}