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

# Call the solve function with sample input and print the output
#Give input
print(solve(${this.generateParameterList()}))
    `;

        // Replace the placeholders in the function template with the input parameters and output variables
        functionTemplate = functionTemplate.replace(/#output/g, this.outputType.name);

        return functionTemplate;
    }

    private generateParameterList(): string {
        return this.inputTypes.map((input) => `${input.name}`).join(', ');
    }
}
