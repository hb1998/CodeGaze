import { FUNCTION_NAME } from './CodeGenerator';
import { IParamType, ParamType } from '../../types/Evaluator.types';
import { LanguageHandler } from './Handler.types';

export class CPPHandler implements LanguageHandler {
    inputTypes: IParamType[];
    outputType: IParamType;

    constructor(inputTypes: IParamType[], outputType: IParamType) {
        this.inputTypes = inputTypes;
        this.outputType = outputType;
    }

    generate() {
        let functionTemplate = `
#include <iostream>
#include <vector>
using namespace std;

${this.generateOutputType()} ${FUNCTION_NAME}(${this.generateParameterList()}) {
    // TODO: Implement the function logic here
    
    // Return the output
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


    private generateOutputType() {
        switch (this.outputType.type) {
            case ParamType.NUMBER:
                return `int`;
            case ParamType.STRING:
                return `string`;
            case ParamType.BOOLEAN:
                return `bool`;
            case ParamType.ARRAY_OF_NUMBER:
                return `std::vector<int>`;
            case ParamType.ARRAY_OF_STRING:
                return `std::vector<std::string>`;
            default:
                return `${this.outputType.type}`
        }
    }
}
