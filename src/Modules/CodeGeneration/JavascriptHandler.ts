import { IParamType } from '../../types/Evaluator.types';
import { FUNCTION_NAME } from './CodeGenerator';
import { LanguageHandler } from './Handler.types';

export class JavascriptHandler implements LanguageHandler {
    inputTypes: IParamType[];
    outputType: IParamType;

    constructor(inputTypes: IParamType[], outputType: IParamType) {
        this.inputTypes = inputTypes || [];
        this.outputType = outputType || {
            name: 'output',
            type: 'string',
        };
    }
    generate(): string {
        let functionTemplate = `function ${FUNCTION_NAME}(${this.generateParameterList()}) {
    // TODO: Implement the function logic here
    // Return the output
    return #output;
}
`;
        // Replace the placeholders in the function template with the input and output variables
        functionTemplate = functionTemplate.replace(/#output/g, this.outputType.name);
        return functionTemplate;
    }

    private generateParameterList(): string {
        return this.inputTypes
            .map((input) => `${input.objectStructure ? ` ${input.objectStructure}` : ''}${input.name}`)
            .join(', ');
    }
}
