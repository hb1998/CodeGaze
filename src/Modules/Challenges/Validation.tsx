import React, { useState} from 'react';
import { Space, Typography } from 'antd';
const { Text } = Typography;
import { Form, Input } from 'antd';
import DynamicInput from './DynamicInput';
import DynamicTestcase from './DynamicTestcase';

type AppContextState = string[];
const appCtxDefaultValue = {
    input: [] as AppContextState,
    setInput: (input: AppContextState) => {} // noop default callback
  };

export const InputContext = React.createContext(appCtxDefaultValue);
export interface IProviderProps {
    children?: any;
  }

interface IValidationProps {
    form: any;
}
const Validation: React.FC<IValidationProps> = ({ form}) => {
    const [input,setInput]=useState<AppContextState>([]);
    const validateInputBasedOnOption = (param: any) => (_: any, value: any, callback: any) => {
        const selectedOption = form.getFieldValue(param);

        if (selectedOption === 'integer' && (!value || !Number.isInteger(Number(value)))) {
            callback('Please enter a valid integer');
        } else if (selectedOption === 'string' && (!value || typeof value !== 'string')) {
            callback('Please enter a valid string');
        } else if (selectedOption === 'array of integers') {
            try {
                const parsedValue = JSON.parse(value);

                if (!Array.isArray(parsedValue) || !parsedValue.every((item) => Number.isInteger(Number(item)))) {
                    callback('Input should be an array of integers');
                }
            } catch (error) {
                callback('Invalid input format');
            }
        } else if (selectedOption === 'array of strings') {
            try {
                const parsedValue = JSON.parse(value);

                if (!Array.isArray(parsedValue) || !parsedValue.every((item) => typeof item === 'string')) {
                    callback('Output should be an array of strings');
                }
            } catch (error) {
                callback('Invalid output format');
            }
        }
        callback();
    };
    return (
        <InputContext.Provider value={{input,setInput}}>
            <Form.Item name="InputOutput">
            <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item>
                    <Text code>Input type</Text>
                    <Space style={{ display: 'flex', marginBottom: 8, marginTop: 8 }} align="baseline">
                        <Form.Item name="input" rules={[{ required: true, message: 'Missing Input' }]}>
                            <Input placeholder="Input" />
                        </Form.Item>
                        <Form.Item name="inputParam" rules={[{ required: true, message: 'Missing InputParam' }]}>
                            <Input placeholder="Input Param" />
                        </Form.Item>
                    </Space>
                    <DynamicInput/>
                </Form.Item>
                <Form.Item>
                    <Text code>Output type</Text>
                    <Space style={{ display: 'flex', marginBottom: 8, marginTop: 8 }} align="baseline">
                        <Form.Item name="output" rules={[{ required: true, message: 'Missing Output' }]}>
                            <Input placeholder="Output" />
                        </Form.Item>
                        <Form.Item name="outputParam" rules={[{ required: true, message: 'Missing OutputParam' }]}>
                            <Input placeholder="Output Param" />
                        </Form.Item>
                    </Space>
                </Form.Item>
            </Space>

            <label>Required test cases</label>
            <Space style={{ display: 'flex', marginBottom: 8, marginTop: 8 }} align="baseline">
                <Form.Item>
                    <Space align="baseline">
                        <Form.Item name="inputValue" rules={[{ validator: validateInputBasedOnOption('input') }]}>
                            <Input placeholder="Sample input" style={{ width: 385 }} />
                        </Form.Item>
                    </Space>
                    <DynamicTestcase />
                </Form.Item>
                <Form.Item>
                    <Space align="baseline">
                        <Form.Item name="outputValue" rules={[{ validator: validateInputBasedOnOption('output') }]}>
                            <Input placeholder="Sample Output" style={{ width: 385 }} />
                        </Form.Item>
                    </Space>
                </Form.Item>
            </Space> 
        </Form.Item>
        </InputContext.Provider>
    );
};
export default Validation;
