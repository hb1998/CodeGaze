import React, { useEffect, useState } from 'react';
import {Button, Col, Form, Input, Modal, Radio, Row, Select, Space, Typography } from 'antd';
import { EditFilled, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ChallengeAPIService } from './services/Challenge.API';
import MDEditor from '@uiw/react-md-editor';

const {Text} =Typography
const {Option}= Select;
interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface IRecord{
  param:any
}
interface CollectionCreateFormProps {
  open: boolean;
  record:any;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}
const difficultyMap: { [key: number]: string } = {
    1: 'Easy',
    2: 'Medium',
    3: 'Hard',
  };

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  record,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [value, setValue] = React.useState('**Hello world!!!**');
  return (
    <div>
    <Modal
      open={open}
      title="Edit Challenge"
      okText="Update"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
      width={900}
      bodyStyle={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          title: record.name,
          description: record.description,
          short_description:record.short_description,
          difficulty: difficultyMap[record.difficulty],
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title of collection!' }]}
        >
          <Input />
        </Form.Item>
        

        <Form.Item name="difficulty" label="Difficult Level">
          <Select placeholder="Easy" allowClear >
            <Option value="easy">Easy</Option>
            <Option value="medium">Medium</Option>
            <Option value="hard">Hard</Option>
          </Select>
        </Form.Item>
        <Form.Item name="short_description" label="Description">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="description" initialValue={value}>
            <MDEditor
                value={value}
                onChange={(val) => {
                    if (val) setValue(val);
                }}
            />
        </Form.Item>
        <Col span={12}>
            <Row>
                <Text code>Input type</Text>
            </Row>
            <Row>
                <Form.List name="inputType" initialValue={record.inputType ? record.inputType.map((item) => ({ type: item.type, name: item.name })) : []}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field) => (
                            <Space key={field.key} align="baseline">
                                <Form.Item
                                    noStyle
                                    shouldUpdate={(prevValues, curValues) =>
                                        prevValues.name !== curValues.name ||
                                        prevValues.type !== curValues.type
                                    }
                                >
                                    {() => (
                                        <Form.Item {...field} name={[field.name, 'type']}>
                                            <Select placeholder="Array Of Integers" allowClear>
                                                <Option value="integer">Integer</Option>
                                                <Option value="string">String</Option>
                                                <Option value="boolean">Boolean</Option>
                                                <Option value="array of integers">
                                                    Array Of Integer
                                                </Option>
                                                <Option value="array of strings">
                                                    Array Of Strings
                                                </Option>
                                            </Select>
                                        </Form.Item>
                                    )}
                                </Form.Item>
                                <Form.Item
                                    {...field}
                                    name={[field.name, 'name']}
                                    rules={[{ required: true, message: 'Missing InputParam' }]}
                                >
                                    <Input placeholder="Input Param" />
                                </Form.Item>

                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                            </Space>
                            ))}

                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                    icon={<PlusOutlined />}
                                >
                                    Add Input param
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Row>
        </Col>
        {/* Output Type */}
        <Col span={12}>
            <Row>
                <Text code>Output type</Text>
            </Row>
            <Row>
                <Form.Item>
                    <Space.Compact>
                        <Form.Item
                            name={['outputType', 'type']}
                            noStyle
                            rules={[{ required: true, message: 'Output is required' }]}
                        >
                            <Select placeholder="Array Of Integer" allowClear>
                                <Option value="integer">Integer</Option>
                                <Option value="string">String</Option>
                                <Option value="boolean">Boolean</Option>
                                <Option value="array of integers">Array Of Integer</Option>
                                <Option value="array of strings">Array Of Strings</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name={['outputType', 'name']}
                            noStyle
                            rules={[{ required: true, message: 'type is required' }]}
                        >
                            <Input placeholder="Output Param" />
                        </Form.Item>
                    </Space.Compact>
                </Form.Item>
            </Row>
        </Col>
        </Form>
    </Modal>
    </div>

  );
};

const Edit: React.FC<IRecord> = ({param}) => {
  const [open, setOpen] = useState(false);

  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };
  const [challenge, setChallenge] = useState([]);

  const fetchChallenges = async () => {
      try {
          const data = await ChallengeAPIService.getById(param);
          setChallenge(data);
          console.log(data)
      } catch (error) {
          console.error('Error fetching candidates:', error);
      }
  };

  useEffect(() => {
      fetchChallenges();
      
  }, []);
  console.log("challenge",challenge)

  return (
    <div>
      <EditFilled style={{color:"blue",marginRight:12}}
        onClick={() => {
          setOpen(true);
        }}
      />
      <CollectionCreateForm
        open={open}
        record={challenge}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default Edit;