import React, { useState } from 'react';
import { Space, Typography } from 'antd';
const { Text } = Typography;
import { Form, Input } from 'antd';
import DynamicInput from './DynamicInput';
import DynamicTestcase from './DynamicTestcase';
import { validateInputBasedOnOption } from './ValidateInput';

type AppContextState = string[];
const appCtxDefaultValue = {
    input: [] as AppContextState,
    setInput: (input: AppContextState) => {}, // noop default callback
};

export const InputContext = React.createContext(appCtxDefaultValue);
export interface IProviderProps {
    children?: any;
}
const Validation: React.FC = () => {
    const [input, setInput] = useState<AppContextState>([]);
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');

    const handleBlurIn = (event: { target: { value: any } }) => {
        const { value } = event.target;
        setInputValue(value);
    };
    const handleBlurOut = (event: { target: { value: any } }) => {
        const { value } = event.target;
        setOutputValue(value);
    };
    return (
        <InputContext.Provider value={{ input, setInput }}>
            <Form.Item name="InputOutput">
                <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item>
                        <Text code>Input type</Text>
                        <Space style={{ display: 'flex', marginBottom: 8, marginTop: 8 }} align="baseline">
                            <Form.Item name="inputType" rules={[{ required: true, message: 'Missing Input' }]}>
                                <Input placeholder="Input" onBlur={handleBlurIn} />
                            </Form.Item>
                            <Form.Item name="inputParam" rules={[{ required: true, message: 'Missing InputParam' }]}>
                                <Input placeholder="Input Param" />
                            </Form.Item>
                        </Space>
                        <DynamicInput />
                    </Form.Item>
                    <Form.Item>
                        <Text code>Output type</Text>
                        <Space style={{ display: 'flex', marginBottom: 8, marginTop: 8 }} align="baseline">
                            <Form.Item name="outputType" rules={[{ required: true, message: 'Missing Output' }]}>
                                <Input placeholder="Output" onBlur={handleBlurOut} />
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
                            <Form.Item
                                name="inputValues"
                                rules={[{ validator: validateInputBasedOnOption(inputValue) }]}
                            >
                                <Input placeholder="Sample input" style={{ width: 385 }} />
                            </Form.Item>
                        </Space>
                        <DynamicTestcase />
                    </Form.Item>
                    <Form.Item>
                        <Space align="baseline">
                            <Form.Item
                                name="outputValues"
                                rules={[{ validator: validateInputBasedOnOption(outputValue) }]}
                            >
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
