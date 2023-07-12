import { FUNCTION_NAME, IParamType } from './CodeGenerator';
import { LanguageHandler } from './Handler.types';

export class PythonHandler implements LanguageHandler {
    inputTypes: IParamType[];
    outputType: IParamType;

    constructor(inputTypes: IParamType[], outputTypes: IParamType) {
        this.inputTypes = inputTypes;
        this.outputType = outputTypes;
    }

    generate(): string {
        let functionTemplate = `def ${FUNCTION_NAME}(${this.generateParameterList()}):
    # TODO: Implement the function logic here

    # Return the output
    return output`;

        // Create an array of output variable names based on output types
        const outputVariables = this.outputType.map((type, index) => `output${index + 1}`);

        // Replace the placeholders in the function template with the input parameters and output variables
        functionTemplate = functionTemplate
            .replace('functionName', 'your_function_name')
            .replace('output', outputVariables.join(', '));

        return functionTemplate;
    }

    private generateParameterList(): string {
        return this.inputTypes
            .map((input) => `${input.type}${input.objectStructure ? ` ${input.objectStructure}` : ''} ${input.name}`)
            .join(', ');
    }
}
