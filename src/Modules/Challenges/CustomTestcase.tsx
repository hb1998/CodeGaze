import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Button, Input, Space } from 'antd';
import { useContext } from 'react';
import { InputContext } from './InputOutputForm';
import { validateInputBasedOnOption } from './ValidateInput';
import { TestcaseContext } from './InputOutputForm';

function CustomTestcase({ len }: any) {
    const context = useContext(InputContext);
    const { inputValue, outputValue } = useContext(TestcaseContext);
    return (
        <Form.List name="customTestCase">
            {(fields, { add, remove }) => {
                return (
                    <div>
                        {fields.map((field, index) => (
                            <div key={field.key}>
                                <Form.Item>
                                <Space align='baseline'>
                                <Form.Item
                                    name={[index, 'inputcase']}
                                    rules={[{ required: true, message: 'Enter Correct Input',validator: validateInputBasedOnOption(inputValue) }]}
                                >
                                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }}>
                                        <Input placeholder={`Sample input ${index+1}`} />
                                    </Space>
                                </Form.Item>
                                <Form.Item
                                    name={[index, 'outputcase']}
                                    rules={[{ required: true, message: 'Enter Correct output',validator: validateInputBasedOnOption(outputValue) }]}
                                >
                                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }}>
                                        <Input placeholder={`Sample output `} />
                                    </Space>
                                </Form.Item>
                                </Space>
                                {Array.from({ length: len }, (_, i) => (
                                    <Form.Item
                                        key={i}
                                        name={[field.name, `inputValue`]}
                                        rules={[{ required: true, message: 'Enter correct input',validator: validateInputBasedOnOption(context.input[i]) }]}
                                    >
                                        <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }}>
                                            <Input placeholder={`Sample input `} />
                                        </Space>
                                    </Form.Item>
                                 ))} 
                                <MinusCircleOutlined style={{ marginLeft: 5, marginBottom:8}} onClick={() => remove(field.name)} />
                                </Form.Item>
                            </div>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} >
                                <PlusOutlined />Add Testcase
                            </Button>
                        </Form.Item>
                    </div>
                );
            }}
        </Form.List>
    );
}
export default CustomTestcase;

