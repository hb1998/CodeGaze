import React, { useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, Select, Space, Typography } from 'antd';
import MDEditor from '@uiw/react-md-editor';
import { ChallengeInsertDto, Difficulty } from '../../types/Models';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { validateInputBasedOnOption } from './ValidateInput';
import { IInputOutput, IParamType } from '../../types/Evaluator.types';
import { ChallengeAPIService } from './services/Challenge.API';

const { Option } = Select;
const { Text } = Typography;


export interface IChallengeCreateForm extends Pick<ChallengeInsertDto, 'name' | 'difficulty' | 'short_description' | 'description'> {
    inputType: IParamType[];
    outputType: IParamType;
    inputOutput: IInputOutput[];
}
interface ICollectionCreateFormProps {
    open: boolean;
    onCreate: (values: IChallengeCreateForm) => void;
    values: IChallengeCreateForm;
    onCancel: () => void;
}

const inputOutputTypes: IParamType['type'][] = [
    'number',
    'string',
    'boolean',
    'arrayOfNumber',
    'arrayOfString',
];

export const ChallengeForm: React.FC<ICollectionCreateFormProps> = ({ open, values, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const [value, setValue] = React.useState('**Hello world!!!**');
    const [reload, setReload] = useState(false); 
    const isEditMode = !!values;
    const saveFormData = async (values: IChallengeCreateForm) => {
        try {
            const { inputType, outputType, inputOutput } = values;
            const dataToSave = {
                name: values.name,
                description: values.description,
                difficulty: values.difficulty,
                short_description: values.short_description,
                input_output: JSON.stringify({
                  inputType: inputType,
                  outputType: outputType,
                  inputOutput: inputOutput,
                }),
              };
      
              const response = await ChallengeAPIService.create(dataToSave);
              if (response && response.error) {
                console.error('Error saving form data:', response.error);
                return;
              }
          
              console.log('Form data saved:', response.data);
              onCreate(values);
              window.location.href = '/challenges'; 
            } catch (error) {
              console.error('Error saving form data:', error);
            }
      };

      React.useEffect(() => {
        if (reload) {
          window.location.reload();
        }
      }, [reload]);
    
      
    return (
        <div style={{ width: '1200px' }}>
            <Modal
                bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}
                open={open}
                title={isEditMode ? "Edit Challenge" : "Create Challenge"}
                okText="Update custom challenges"
                cancelText="Cancel"
                onCancel={onCancel}
                width={900}
                onOk={() => {
                    form.validateFields()
                        .then((values) => {
                            console.log(values)
                            form.resetFields();
                            onCreate(values);
                            saveFormData(values);
                           
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    autoComplete="off"
                    name="form_in_modal"
                    initialValues={values ? values : {
                        inputType: [
                            {
                                type: "number",
                                name: "input1"
                            }
                        ],
                        output: {
                            type: "number",
                            name: "output1"
                        }
                    }}
                    layout="vertical"
                >
                    <Form.Item label='Name' name="name">
                        <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item name="difficulty" label="Difficulty">
                        <Select placeholder="Easy">
                            <Option value={Difficulty.easy}>Easy</Option>
                            <Option value={Difficulty.medium}>Medium</Option>
                            <Option value={Difficulty.hard}>Hard</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="short_description" label="Short Description">
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description" initialValue={value}>
                        <MDEditor
                            value={value}
                            onChange={(val) => {
                                if (val) setValue(val);
                            }}
                        />
                    </Form.Item>
                    {/* <InputOutputForm /> */}
                    {/* Input type */}
                    <Row>
                        <Col span={12}>
                            <Row style={{ marginBottom: '1rem' }} >
                                <Text>Input Format</Text>
                            </Row>
                            <Row>
                                <Form.List name="inputType">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map((field, index) => (
                                                <Row gutter={16} style={{ width: '100%' }} >
                                                    <Col span={11} >
                                                        <Form.Item {...field} name={[field.name, 'type']}>
                                                            <Select placeholder="Array Of Integers" >
                                                                {inputOutputTypes.map((type) => (
                                                                    <Option value={type}>{type}</Option>
                                                                ))
                                                                }
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
                                                    <Col span={2}  >
                                                        {index > 0 && <MinusCircleOutlined onClick={() => remove(field.name)} />}
                                                    </Col>
                                                </Row>

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
                            <Row style={{ marginBottom: '1rem' }} >
                                <Text>Output Format</Text>
                            </Row>

                            <Row gutter={16} style={{ width: '100%' }}>
                                <Col span={12}>
                                    <Form.Item
                                        name={['outputType', 'type']}
                                        rules={[{ required: true, message: 'Output is required' }]}
                                    >
                                        <Select placeholder="Array Of Integer" >
                                            {inputOutputTypes.map((type) => (
                                                <Option value={type}>{type}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name={['outputType', 'name']}
                                        noStyle
                                        rules={[{ required: true, message: 'type is required' }]}
                                    >
                                        <Input placeholder="Output Param" />
                                    </Form.Item>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                    {/* Test Cases */}
                    <Text>Required testcases</Text>
                    <br />
                    <Form.List name="inputOutput">
                        {(fields, { add, remove }) => (
                            <>
                                <Row style={{ width: '100%' }} >
                                    {fields.map((field) => (
                                        <Row gutter={16} style={{ width: '100%' }} key={field.key}>
                                            <Col span={11}>
                                                <Form.Item shouldUpdate={(prevValues, curValues) => prevValues.inputType !== curValues.inputType}>
                                                    <Form.List
                                                        name={[field.name, 'input']}
                                                        initialValue={getInitialValue(form.getFieldValue('inputType'))}
                                                    >
                                                        {(fields) => (
                                                            <div>
                                                                {fields.map((field) => (
                                                                    <Form.Item {...field} rules={[{ validator: validateInputBasedOnOption(form.getFieldValue('inputType')[field.key]?.type) }]}>
                                                                        <Input placeholder='1 or [1,2,3] ' />
                                                                    </Form.Item>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </Form.List>
                                                </Form.Item>
                                            </Col>
                                            <Col span={11}>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'output']}
                                                    noStyle
                                                    rules={[{ validator: validateInputBasedOnOption(form.getFieldValue("")) }]}
                                                >
                                                    <Input placeholder="Output" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={2}>
                                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                                            </Col>
                                        </Row>
                                    ))}
                                </Row>

                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add Test Case
                                    </Button>
                                </Form.Item>
                            </>
                        )
                        }
                    </Form.List>
                </Form>
            </Modal>
        </div >
    );
};

const getInitialValue = (inputType: IParamType[]) => {
    return inputType.map((param) => {
        const type = param?.type || 'number';
        switch (type) {
            case 'number':
                return '1';
            case 'string':
                return 'hello';
            case 'boolean':
                return 'true';
            case 'arrayOfNumber':
                return '[1,2,3]';
            case 'arrayOfString':
                return '["hello","world"]';
            default:
                return '1';
        }
    });
}