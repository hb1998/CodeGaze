import { FUNCTION_NAME, IParamType } from './CodeGenerator';
import { LanguageHandler } from './Handler.types';

export class CPPHandler implements LanguageHandler {
    inputTypes: IParamType[];
    outputType: IParamType;

    constructor(inputTypes: IParamType[], outputType: IParamType) {
        this.inputTypes = inputTypes;
        this.outputType = outputType;
    }

    generate() {
        let functionTemplate = `#include <iostream>
using namespace std;

${this.outputType.type} ${FUNCTION_NAME}(${this.generateParameterList()}) {
    // TODO: Implement the function logic here
    
    // Return the output
}


int main(){
    // Call the solve function with sample input and print the output
    cout << ${FUNCTION_NAME}(0, 0) << endl;
    return 0;
}
`;

        // Replace the placeholders in the function template with the input parameters
        functionTemplate = functionTemplate.replace(/#output/g, this.outputType.name);

        return functionTemplate;
    }

    private generateParameterList() {
        return this.inputTypes
            .map((input) => {
                if (input.type === 'arrayOfString') {
                    return `const std::vector<std::string>& ${input.name}`;
                } else if (input.type === 'arrayOfNumber') {
                    return `const std::vector<int>& ${input.name}`;
                } else if (input.type === 'number') {
                    return `int ${input.name}`;
                } else if (input.type === 'boolean') {
                    return `bool ${input.name}`;
                } else {
                    return `${input.type} ${input.name}`;
                }
            })
            .join(', ');
    }
}
