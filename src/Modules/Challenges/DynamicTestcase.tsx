import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Button, Input, Space } from 'antd';
import { useContext } from 'react';
import { InputContext } from './Validation';
import { validateInputBasedOnOption } from './ValidateInput';
function DynamicTestcase() {
    const context =useContext(InputContext);
    return (
            <Form.List name="fields">
            {(fields, { add, remove }) => {
                return (
                    <div>
                        {fields.map((field, index) => (
                            <div key={field.key}>
                                <Form.Item
                                    name={[index, 'name']}
                                    rules={[{ required: true, message: 'Enter Correct Input',validator: validateInputBasedOnOption(context.input[index]) }]}
                                >
                                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Input placeholder={`Sample input ${index + 1}`} style={{ width: 385 }} />
                                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                                    </Space>
                                </Form.Item>
                            </div>
                        ))}
                        {/* <Form.Item>
                            <Button type="dashed" onClick={() => add()} style={{ width: '60%' }}>
                                <PlusOutlined /> Add field
                            </Button>
                        </Form.Item> */}
                    </div>
                );
            }}
        </Form.List>

    );
}
export default DynamicTestcase;

