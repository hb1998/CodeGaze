import { FUNCTION_NAME, IInputOutput, IParamType, ParamType } from '../../../types/Evaluator.types';
import { ProgrammingLanguages } from '../../common/CodeEditor/ProgrammingLanguages';
import { separator } from '../CodeEvaluator';

export class JavaEvaluator {
    inputTypes: IParamType[];
    outputType: IParamType;
    languageId = ProgrammingLanguages.java.id.toString()

    constructor(inputTypes: IParamType[], outputType: IParamType) {
        this.inputTypes = inputTypes;
        this.outputType = outputType;
    }

    getResult(outputArray: string[], testCases: IInputOutput[]): boolean[] {
    return testCases.map((testCase, index) => {
            return outputArray[index] === 'true';
        })
    }

    getEvaluateTemplate(code: string, testCases: IInputOutput[]) {
        return `
      import java.util.*;
        
      public class Main {

        ${code}

        public static void main(String[] args) {
            ${testCases
                .map((testCase) => {
                    return `${this.getCompareCode(testCase)}
                    System.out.println("${separator}");
                    `
                })
                .join('\n')}
        }
    
    }
      `;
    }

    private getCompareCode = (testCase: IInputOutput) => {
        const outputParam = this.getCodeForParameter(this.outputType.type, testCase.output);
        switch (this.outputType.type) {
            case ParamType.NUMBER:
                return `System.out.println(${FUNCTION_NAME}(${this.parseTestCase(testCase)}) == ${outputParam});`;
            case ParamType.ARRAY_OF_NUMBER:
            case ParamType.ARRAY_OF_STRING:
                return `System.out.println(Arrays.equals(${FUNCTION_NAME}(${this.parseTestCase(testCase)}), ${outputParam}));`;
            case ParamType.STRING:
                return `System.out.println(${FUNCTION_NAME}(${this.parseTestCase(testCase)}).equals("${outputParam}"));`;
            case ParamType.BOOLEAN:
                return `System.out.println(${FUNCTION_NAME}(${this.parseTestCase(testCase)}) == ${outputParam});`;
            case ParamType.OBJECT:
            case ParamType.ARRAY_OF_OBJECT:
                return `System.out.println(getObject(${FUNCTION_NAME}(${this.parseTestCase(testCase)})).equals(getObject("${outputParam}")));`;
            default:
                return `System.out.println(${FUNCTION_NAME}(${this.parseTestCase(testCase)}) == ${outputParam});`;
        }
    }

    private parseTestCase = (testCase: IInputOutput) => {
        return `${testCase.input.map((caseItem, index) => {
            return this.getCodeForParameter(this.inputTypes[index].type, caseItem);
        }).join(', ')}`;
    }

    private getArrayLiteral = (array: string) => {
        return `{${array.replace(/[\\[\]]/g, '')}}`;
    }

    private getCodeForParameter(type: ParamType, caseItem: string) {
        switch (type) {
            case ParamType.ARRAY_OF_NUMBER: {
                const arrayLiteral = this.getArrayLiteral(caseItem);
                return `new long[] ${arrayLiteral}`;
            }
            case ParamType.ARRAY_OF_STRING: {
                const arrayLiteral = this.getArrayLiteral(caseItem);
                return `new String[] ${arrayLiteral}`;
            }
            case ParamType.NUMBER:
            case ParamType.STRING:
            case ParamType.BOOLEAN: {
                return caseItem;
            }
            default:
                return caseItem;

        }
    }
}


    // public static Object getObject(String jsonString){
        //     try {
        //          ObjectMapper objectMapper = new ObjectMapper();
        //          Object javaObject = objectMapper.readValue(jsonString, Object.class);
     
        //          // Now, javaObject contains the appropriate Java representation of the JSON data
        //          return javaObject;
        //      } catch (Exception e) {
        //          e.printStackTrace();
        //          return null;
        //      }
        //  }