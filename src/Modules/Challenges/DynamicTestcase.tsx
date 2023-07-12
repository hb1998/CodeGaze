import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Button, Input, Space } from 'antd';
import { useContext } from 'react';
import { InputContext } from './Validation';
function DynamicTestcase() {
    const context =useContext(InputContext);
        
    const validateInputBasedOnOption = (param: any) => (_: any, value: any, callback: any) => {
        const selectedOption = param;
        console.log("test",param);

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
            <Form.List name="fields">
            {(fields, { add, remove }) => {
                return (
                    <div>
                        {fields.map((field, index) => (
                            <div key={field.key}>
                                <Form.Item
                                    name={[index, 'name']}
                                    rules={[{ required: true, message: 'Enter Correct Input',validator: validateInputBasedOnOption(context.input) }]}
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

