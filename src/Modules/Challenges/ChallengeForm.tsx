import React, { useEffect } from 'react';
import { Button, Col, Form, Input, Modal, Row, Select, Space, Typography } from 'antd';
import MDEditor from '@uiw/react-md-editor';
import InputOutputForm from './InputOutputForm';
import { Difficulty } from '../../types/Models';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Text } = Typography;



interface IValues {
    title: string;
    description: string;
    modifier: string;
}
interface ICollectionCreateFormProps {
    open: boolean;
    onCreate: (values: IValues) => void;
    onCancel: () => void;
}

export const ChallengeForm: React.FC<ICollectionCreateFormProps> = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const [value, setValue] = React.useState('**Hello world!!!**');


    const inputTypeValue = form.getFieldValue('inputType');

    useEffect(() => {
        const inputTestCase = inputTypeValue.map((value) => '');
        form.setFieldsValue({ inputTestCase });
    }, [form, inputTypeValue])

    return (
        <div style={{ width: '1200px' }}>
            <Modal
                bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}
                open={open}
                title="Edit Challenge"
                okText="Update custom challenges"
                cancelText="Cancel"
                onCancel={onCancel}
                width={900}
                onOk={() => {
                    form.validateFields()
                        .then((values: IValues) => {
                            form.resetFields();
                            onCreate(values);
                        })
                        .catch((info: any) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    autoComplete="off"
                    name="form_in_modal"

                    initialValues={{ modifier: 'public' }}
                    layout="vertical"
                >
                    <Form.Item name="name">
                        <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item name="difficulty" label="Difficult Level">
                        <Select placeholder="Easy" allowClear >
                            <Option value={Difficulty.easy}>Easy</Option>
                            <Option value={Difficulty.medium}>Medium</Option>
                            <Option value={Difficulty.hard}>Hard</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="short_description" label="Description">
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" initialValue={value}>
                        <MDEditor
                            value={value}
                            onChange={(val) => {
                                if (val)
                                    setValue(val)
                            }}
                        />
                    </Form.Item>
                    {/* <InputOutputForm /> */}


                    {/* Input type */}
                    <Row>
                        <Col span={12}>
                            <Row>
                                <Text code>Input type</Text>
                            </Row>
                            <Row>
                                <Form.List name="inputType">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map((field) => (
                                                <Space key={field.key} align="baseline">
                                                    <Form.Item
                                                        noStyle
                                                        shouldUpdate={(prevValues, curValues) =>
                                                            prevValues.name !== curValues.name || prevValues.type !== curValues.type
                                                        }
                                                    >
                                                        {() => (

                                                            <Form.Item
                                                                {...field} name={[field.name, "type"]}>
                                                                <Select placeholder="Array Of Integers" allowClear >
                                                                    <Option value="integer">Integer</Option>
                                                                    <Option value="string">String</Option>
                                                                    <Option value="array of integers">Array Of Integer</Option>
                                                                    <Option value="array of strings">Array Of Strings</Option>
                                                                </Select>
                                                            </Form.Item>
                                                        )}
                                                    </Form.Item>
                                                    <Form.Item {...field} name={[field.name, "name"]} rules={[{ required: true, message: 'Missing InputParam' }]}>
                                                        <Input placeholder="Input Param" />
                                                    </Form.Item>

                                                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                                                </Space>
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
                        </Col>
                        {/* Output Type */}
                        <Col span={12}>
                            <Row>
                                <Text code>Output type</Text>
                            </Row>
                            <Row>
                                <Form.Item >
                                    <Space.Compact>
                                        <Form.Item
                                            name={['outputType', 'type']}
                                            noStyle
                                            rules={[{ required: true, message: 'Province is required' }]}
                                        >

                                            <Select placeholder="Array Of Integer" allowClear >
                                                <Option value="integer">Integer</Option>
                                                <Option value="string">String</Option>
                                                <Option value="array of integers">Array Of Integer</Option>
                                                <Option value="array of strings">Array Of Strings</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            name={['outputType', 'name']}
                                            noStyle
                                            rules={[{ required: true, message: 'type is required is required' }]}
                                        >
                                            <Input placeholder="Output Param" />
                                        </Form.Item>
                                    </Space.Compact>
                                </Form.Item>
                            </Row>
                        </Col>
                    </Row>
                    {/* Test Cases */}

                    <Form.List name="inputOutput">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field) => (
                                    <Space key={field.key} align="baseline">


                                        <Form.Item label="Input">
                                            <Space.Compact>


                                                <Form.List name="input">
                                                    {(fields, { add, remove }) => (
                                                        <>
                                                            {fields.map((field) => (
                                                                <Space key={field.key} align="baseline">
                                                                    <Form.Item label="Input">
                                                                        <Space.Compact>
                                                                            <Form.Item
                                                                                {...field}
                                                                                noStyle
                                                                                rules={[{ required: true, message: 'type is required is required' }]}
                                                                            >
                                                                                <Input placeholder="Input value" />
                                                                            </Form.Item>
                                                                        </Space.Compact>
                                                                    </Form.Item>


                                                                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                                                                </Space>

                                                            ))}

                                                        </>
                                                    )}
                                                </Form.List>


                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'name']}
                                                    noStyle
                                                    rules={[{ required: true, message: 'type is required is required' }]}
                                                >
                                                    <Input placeholder="Output Param" />
                                                </Form.Item>
                                            </Space.Compact>
                                        </Form.Item>


                                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                                    </Space>

                                ))}

                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add Test Case
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                </Form>
            </Modal>
        </div>
    );
};
