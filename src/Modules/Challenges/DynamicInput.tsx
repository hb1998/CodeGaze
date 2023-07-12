import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Button, Input, Space } from 'antd';
import { useState,useContext} from 'react';
import { InputContext } from './Validation';
function DynamicInput() {
    const [inputValues, setInputValues] = useState<string[]>([]);
    const { setInput }= useContext(InputContext)
    // const handleBlur = (event: { target: { value: any; }; }) => {
    //     const { value } = event.target;
    //     setInputValues((prevInputValues) => [...prevInputValues, value]);
    //     setInput(inputValues);
    //   };
    const handleBlur = (event: { target: { value: any; }; }, index: number) => {
        const { value } = event.target;
        setInputValues((prevInputValues) => {
          const newInputValues = [...prevInputValues];
          newInputValues[index] = value;
          return newInputValues;
        });
        console.log(inputValues)
        setInput(inputValues);
        
      };

    return (
            <Form.List name="fields">
            {(fields, { add, remove }) => {
                return (
                    <>
                        {fields.map((field, index) => (
                                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        name={[field.name, 'input']}
                                        rules={[{ required: true, message: 'Missing Input' }]}
                                    >
                                        <Input placeholder={`Input type ${index + 1}`} onBlur={(event) => handleBlur(event, index)} />
                                        
                                    </Form.Item>
                                    <Form.Item
                                        name={[field.name, 'inputParam']}
                                        rules={[{ required: true, message: 'Missing InputParam' }]}
                                    >
                                        <Input placeholder={`Input Param ${index + 1}`} />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                                </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() =>{{add()}}} style={{ width: '60%' }}>
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
