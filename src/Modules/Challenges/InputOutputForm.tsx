import React, { useState } from 'react';
import { Select, Space, Typography } from 'antd';
const { Text } = Typography;
import { Form, Input } from 'antd';
import DynamicInput from './DynamicInput';
import DynamicTestcase from './DynamicTestcase';
import { validateInputBasedOnOption } from './ValidateInput';
const { Option } = Select;

type AppContextState = string[];
const appCtxDefaultValue = {
    input: [] as AppContextState,
    setInput: (input: AppContextState) => { }, // noop default callback
};

export const InputContext = React.createContext(appCtxDefaultValue);
export const TestcaseContext = React.createContext({
    inputValue: '',
    outputValue: '',
})

export interface IProviderProps {
    children?: any;
}
const InputOutputForm: React.FC = () => {
    const [input, setInput] = useState<AppContextState>([]);
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');

    return (
        <InputContext.Provider value={{ input, setInput }}>
            <Form.Item>
                <Space style={{ display: 'flex' }} align="baseline">
                    <Form.Item>
                        <Text code>Input type</Text>
                        <Space style={{ display: 'flex', marginBottom: 8, marginTop: 8 }} align="baseline">
                            <Form.Item name="inputType">
                                <Select placeholder="Array Of Integers" allowClear value={inputValue} onChange={setInputValue} >
                                    <Option value="integer">Integer</Option>
                                    <Option value="string">String</Option>
                                    <Option value="array of integers">Array Of Integer</Option>
                                    <Option value="array of strings">Array Of Strings</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="InputParam" rules={[{ required: true, message: 'Missing InputParam' }]}>
                                <Input placeholder="Input Param" />
                            </Form.Item>
                        </Space>
                        <DynamicInput />
                    </Form.Item>
                    <Form.Item>
                        <Text code>Output type</Text>
                        <Space style={{ display: 'flex', marginBottom: 8, marginTop: 8 }} align="baseline">
                            <Form.Item name="outputType">
                                <Select placeholder="Array Of Integer" allowClear value={outputValue} onChange={setOutputValue} >
                                    <Option value="integer">Integer</Option>
                                    <Option value="string">String</Option>
                                    <Option value="array of integers">Array Of Integer</Option>
                                    <Option value="array of strings">Array Of Strings</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="outputParam" rules={[{ required: true, message: 'Missing OutputParam' }]}>
                                <Input placeholder="Output Param" />
                            </Form.Item>
                        </Space>
                    </Form.Item>
                </Space>

                <label>Required test cases</label>
                <Space style={{ display: 'flex', marginTop: 8 }} align="baseline">
                    <Form.Item>
                        <Space align="baseline">
                            <Form.Item
                                name="inputValue"
                                rules={[{ validator: validateInputBasedOnOption(inputValue) }]}
                            >
                                <Input placeholder="Sample input 0" />
                            </Form.Item>
                        </Space>
                    </Form.Item>
                    <Form.Item>
                        <Space align="baseline">
                            <Form.Item
                                name="outputValue"
                                rules={[{ validator: validateInputBasedOnOption(outputValue) }]}
                            >
                                <Input placeholder="Sample Output" />
                            </Form.Item>
                        </Space>
                    </Form.Item>
                </Space>
                <TestcaseContext.Provider value={{ inputValue, outputValue }}>
                    <DynamicTestcase />
                </TestcaseContext.Provider>
            </Form.Item>
        </InputContext.Provider>
    );
};
export default InputOutputForm;
