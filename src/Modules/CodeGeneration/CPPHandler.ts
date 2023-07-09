import { FUNCTION_NAME, IInputType } from "./CodeGenerator";
import { LanguageHandler } from "./Handler.types";

export class CPPHandler implements LanguageHandler {
    inputTypes: IInputType[];
    outputTypes: string[];

    constructor(inputTypes: IInputType[], outputTypes: string[]) {
        this.inputTypes = inputTypes;
        this.outputTypes = outputTypes;
    }

    generate() {
        let functionTemplate = `
        #include <iostream>
        using namespace std;

        int main(){
            
        }
        ${this.outputTypes[0]} ${FUNCTION_NAME}(${this.generateParameterList()}) {
            // TODO: Implement the function logic here
    
            // Return the output
            return output;
        }`;

        // Replace the placeholders in the function template with the input parameters
        functionTemplate = functionTemplate.replace('output', '');

        return functionTemplate;
    }

    private generateParameterList() {
        return this.inputTypes.map((input) => {
            if (input.type === 'arrayOfString') {
                return `const std::vector<std::string>& ${input.name}`;
            } else if (input.type === 'arrayOfNumber') {
                return `const std::vector<int>& ${input.name}`;
            } else if (input.type === 'number') {
                return `int ${input.name}`;
            } else if (input.type === 'boolean') {
                return `bool ${input.name}`;
            }
            else {
                return `${input.type} ${input.name}`;
            }
        }).join(', ');
    }


}