import { Form, Input, Space } from 'antd';
import { useContext } from 'react';
import { InputContext } from './Validation';
import { validateInputBasedOnOption } from './ValidateInput';
import CustomTestcase from './CustomTestcase';
function DynamicTestcase() {
    const context =useContext(InputContext);
    return (
            <Form.List name="fields">
            {(fields) => {
                return (
                    <div>
                        {fields.map((field, index) => (
                            <div key={field.key}>
                                <Form.Item
                                    name={[index, 'input']}
                                    rules={[{ required: true, message: 'Enter Correct Input',validator: validateInputBasedOnOption(context.input[index]) }]}
                                >
                                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }}>
                                        <Input placeholder={`Sample input`} />
                                    </Space>
                                </Form.Item>
                            </div>
                        ))}
                        <CustomTestcase len={fields.length}/>
                    </div>
                );
            }}
        </Form.List>
    );
}
export default DynamicTestcase;

