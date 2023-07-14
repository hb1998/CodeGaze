import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Button, Input, Space, Select } from 'antd';
import { useState, useContext } from 'react';
import { InputContext } from './Validation';

const {Option} = Select

function DynamicInput() {
    const [inputValues, setInputValues] = useState<string[]>([]);
    const { setInput } = useContext(InputContext);

    const handleBlur = (value: string, index: number) => {
        setInputValues((prevInputValues) => {
          const newInputValues = [...prevInputValues];
          newInputValues[index] = value;
          setInput(newInputValues);
          console.log(newInputValues);
          return newInputValues;
        });
      };
    return (
        <Form.List name="fields">
            {(fields, { add, remove }) => {
                return (
                    <>
                        {fields.map((field, index) => (
                            <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item name={[field.name, `inputType${index+1}`]}>
                                <Select placeholder="Array Of Integer" allowClear onChange={(value) => handleBlur(value, index)}>
                                    <Option value="integer">Integer</Option>
                                    <Option value="string">String</Option>
                                    <Option value="array of integers">Array Of Integers</Option>
                                    <Option value="array of strings">Array Of Strings</Option>
                                </Select>
                               </Form.Item>
                                <Form.Item
                                    name={[field.name, `inputParam ${index + 1}`]}
                                    rules={[{ required: true, message: 'Missing InputParam' }]}
                                >
                                    <Input placeholder={`Input Param ${index + 1}`} />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => {{add()}}}>
                                <PlusOutlined /> Add field
                            </Button>
                        </Form.Item>
                    </>
                );
            }}
        </Form.List>
    );
}

export default DynamicInput;
