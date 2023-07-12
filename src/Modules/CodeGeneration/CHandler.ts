import { IParamType } from './CodeGenerator';
import { LanguageHandler } from './Handler.types';

export class CHandler implements LanguageHandler {
    inputTypes: IParamType[];
    outputType: IParamType;

    constructor(inputTypes: IParamType[], outputType: IParamType) {
        this.inputTypes = inputTypes;
        this.outputType = outputType;
    }

    generate(): string {
        let functionTemplate = `#include <stdio.h>

${this.generateParameterList()} {
// TODO: Implement the function logic here
// Return the output
}


int main() {
// Call the solve function with sample input and print the output
printf("%d", solve(0, 0));
return 0;

}`;

        // Replace the placeholders in the function template with the input parameters and output variable
        functionTemplate = functionTemplate.replace(/#output/g, this.outputType.name);
        return functionTemplate;
    }

    private generateParameterList(): string {
        return this.inputTypes
            .map((input) => `${input.type}${input.objectStructure ? ` ${input.objectStructure}` : ''} ${input.name}`)
            .join(', ');
    }
}
