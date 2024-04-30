import { IParamType, ParamType } from '../../types/Evaluator.types';
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

 main(${this.generateParameterList()}) {
// TODO: Implement the function logic here
// Return the output
}

`;

        // Replace the placeholders in the function template with the input parameters and output variable
        functionTemplate = functionTemplate.replace(/#output/g, this.outputType.name);
        return functionTemplate;
    }

    private generateParameterList(): string {
        return this.inputTypes
            .map((input) => {
                switch (input.type) {
                    case ParamType.NUMBER:
                        return `int ${input.name}`;
                    case ParamType.ARRAY_OF_NUMBER:
                        return `int[] ${input.name}`;
                    case ParamType.ARRAY_OF_STRING:
                        return `String[] ${input.name}`;
                    case ParamType.ARRAY_OF_OBJECT:
                        return `Object[] ${input.name}`;
                    case ParamType.OBJECT:
                        return `Object ${input.name}`;
                    case ParamType.BOOLEAN:
                        return `boolean ${input.name}`;
                    case ParamType.STRING:
                        return `String ${input.name}`;
                }
            })
            .join(', ');
    }

    private generateOutputList() {
        switch (this.outputType.type) {
            case ParamType.NUMBER:
                return 'int';
            case ParamType.ARRAY_OF_NUMBER:
                return `int[]`;
            case ParamType.ARRAY_OF_STRING:
                return `String[]`;
            case ParamType.ARRAY_OF_OBJECT:
                return `Object[]`;
            case ParamType.OBJECT:
                return `boolean`;
            case ParamType.STRING:
                return `String`;
        }
    }
}
