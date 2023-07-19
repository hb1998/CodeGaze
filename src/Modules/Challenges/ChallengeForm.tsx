import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, Select, Space, Typography } from 'antd';
import MDEditor from '@uiw/react-md-editor';
import { ChallengeInsertDto, Difficulty } from '../../types/Models';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { validateInputBasedOnOption } from './ValidateInput';
import { IInputOutput, IParamType } from '../../types/Evaluator.types';
import { ChallengeAPIService } from './services/Challenge.API';
import InputType from './InputType';
import OutputType from './OutputType';
import TestCases from './TestCases';

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

export const inputOutputTypes: IParamType['type'][] = [
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

    useEffect(() => {
        form.setFieldsValue(values);
    }, [form, values])


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
                    initialValues={{
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
                    <Row>
                        <Col span={12}>
                            <InputType />
                        </Col>
                        <Col span={12}>
                            <OutputType />
                        </Col>
                    </Row>
                    <TestCases />
                </Form>
            </Modal>
        </div >
    );
};
