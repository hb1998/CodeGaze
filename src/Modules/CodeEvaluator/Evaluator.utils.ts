import { IInputOutput, IParamType } from "../../types/Evaluator.types"

export default class EvaluatorUtils {

    static getInputArgs(testCase: IInputOutput, inputTypes: IParamType[]) {
        return testCase.input.map((arg, index) => {
            if (inputTypes[index].type === 'string') {
                return `'${arg}'`
            } else if (['object', 'arrayOfObject'].includes(inputTypes[index].type)) {
                return `parseJSON('${arg}')`
            } else if (inputTypes[index].type === 'arrayOfObject') {
                return `${arg.split(',').map((arg) => `{${arg.split(':')[0]}:${arg.split(':')[1]}}`).join(',')}`
            } else {
                return `${arg}`
            }
        }).join(', ')
    }

    static getOutputArgs(output: string, outputType: IParamType) {
        if (outputType.type === 'string') {
            return `'${output}'`
        } else if (outputType.type === 'object') {
            return `{${output.split(',').map((arg) => `'${arg.split(':')[0]}':${arg.split(':')[1]}`).join(',')}}`
        } else if (outputType.type === 'arrayOfObject') {
            return `[${output.split(',').map((arg) => `{${arg.split(':')[0]}:${arg.split(':')[1]}}`).join(',')}]`
        } else {
            return `${output}`
        }

    }


}