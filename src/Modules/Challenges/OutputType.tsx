import React from 'react';
import { Col, Form, Input, Row, Select, Typography } from 'antd';
import { inputOutputTypes } from './ChallengeForm';

const { Option } = Select;
const {Text}= Typography;

const OutputType: React.FC = () => {
  return (
    <>
      <Row style={{ marginBottom: '1rem' }}>
        <Text>Output Format</Text>
      </Row>

      <Row gutter={16} style={{ width: '100%' }}>
        <Col span={12}>
          <Form.Item name={['outputType', 'type']} rules={[{ required: true, message: 'Output is required' }]}>
            <Select placeholder="Array Of Integer">
              {inputOutputTypes.map((type) => (
                <Option value={type}>{type}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={['outputType', 'name']} noStyle rules={[{ required: true, message: 'type is required' }]}>
            <Input placeholder="Output Param" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default OutputType;
