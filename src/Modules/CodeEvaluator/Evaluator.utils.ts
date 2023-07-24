import { IInputOutput, IParamType } from "../../types/Evaluator.types"

export default class EvaluatorUtils {

    static getInputArgs(testCase: IInputOutput, inputTypes: IParamType[]) {
        return testCase.input.map((arg, index) => {
            if (inputTypes[index].type === 'string') {
                return `'${arg}'`
            }  else if (inputTypes[index].type === 'object') {
                return `{${arg.split(',').map((arg) => `'${arg.split(':')[0]}':${arg.split(':')[1]}`).join(',')}}`
            } else if (inputTypes[index].type === 'arrayOfObject') {
                return `[${arg.split(',').map((arg) => `{${arg.split(':')[0]}:${arg.split(':')[1]}}`).join(',')}]`
            } else {
                return `${arg}`
            }
        }).join(', ')

    }
}