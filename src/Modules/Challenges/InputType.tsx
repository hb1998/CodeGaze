import React from 'react';
import { Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { inputOutputTypes } from './ChallengeForm';

const { Option } = Select;
const { Text } = Typography;

const InputType: React.FC = () => {
  return (
    <>
    <Row style={{ marginBottom: '1rem' }}>
          <Text>Input Format</Text>
        </Row>
        <Row>
          <Form.List name="inputType">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Row gutter={16} style={{ width: '100%' }}>
                    <Col span={11}>
                      <Form.Item {...field} name={[field.name, 'type']}>
                        <Select placeholder="Array Of Integers">
                          {inputOutputTypes.map((type) => (
                            <Option value={type}>{type}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={11}>
                      <Form.Item
                        {...field}
                        name={[field.name, 'name']}
                        rules={[{ required: true, message: 'Missing InputParam' }]}
                      >
                        <Input placeholder="Input Param" />
                      </Form.Item>
                    </Col>
                    <Col span={2}>{index > 0 && <MinusCircleOutlined onClick={() => remove(field.name)} />}</Col>
                  </Row>
                ))}

                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Input param
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Row>
    </>
  );
};
export default InputType;
