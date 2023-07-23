import React, { useEffect, useState } from 'react';
import { Col, Form, Input, Modal, Row, Select } from 'antd';
import MDEditor from '@uiw/react-md-editor';
import { Challenge, ChallengeInsertDto, ChallengeUpdateDto, Difficulty } from '../../types/Models';
import { IInputOutput, IParamType, ParamType } from '../../types/Evaluator.types';
import { ChallengeAPIService } from './services/Challenge.API';
import InputType from './InputType';
import OutputType from './OutputType';
import TestCases from './TestCases';
import { Json } from '../../types/schema';

const { Option } = Select;

export interface IChallengeCreateForm
    extends Pick<Challenge, 'name' | 'difficulty' | 'short_description' | 'description' | 'id'> {
    inputType: IParamType[];
    outputType: IParamType;
    inputOutput: IInputOutput[];
}
interface ICollectionCreateFormProps {
    open: boolean;
    onCreate: () => void;
    challenge: Challenge;
    onCancel: () => void;
}

export const inputOutputTypes: IParamType['type'][] = [
    ParamType.NUMBER,
    ParamType.STRING,
    ParamType.ARRAY_OF_NUMBER,
    ParamType.ARRAY_OF_STRING,
    ParamType.BOOLEAN,
];

export const ChallengeForm: React.FC<ICollectionCreateFormProps> = ({ open, challenge, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const [value, setValue] = React.useState('**Hello world!!!**');
    const [loading, setLoading] = useState<boolean>(false);
    const isEditMode = !!challenge;

    const saveFormData = async (formValues: IChallengeCreateForm) => {
        try {
            setLoading(true);
            const { inputType, outputType, inputOutput } = formValues;
            const dataToSave: ChallengeInsertDto = {
                id: challenge.id,
                name: formValues.name,
                description: formValues.description,
                difficulty: formValues.difficulty,
                short_description: formValues.short_description,
                input_output: {
                    inputType: inputType,
                    outputType: outputType,
                    inputOutput: inputOutput,
                } as Record<string, any>,
            };
            if (challenge.id) {
                await ChallengeAPIService.update(dataToSave);
            } else {
                await ChallengeAPIService.create(dataToSave);
            }
            form.resetFields();
            onCreate();
        } catch (error) {
            console.error('Error saving form data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const values = getFormValues(challenge);
        form.setFieldsValue(values);
    }, [form, challenge]);

    return (
        <div style={{ width: '1200px' }}>
            <Modal
                bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}
                open={open}
                title={isEditMode ? 'Edit Challenge' : 'Create Challenge'}
                okText="Update custom challenges"
                cancelText="Cancel"
                onCancel={onCancel}
                width={900}
                confirmLoading={loading}
                onOk={() => {
                    form.validateFields()
                        .then((values) => {
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
                    initialValues={
                        challenge
                            ? getFormValues(challenge)
                            : {
                                  inputType: [
                                      {
                                          type: 'number',
                                          name: 'input1',
                                      },
                                  ],
                                  output: {
                                      type: 'number',
                                      name: 'output1',
                                  },
                              }
                    }
                    layout="vertical"
                >
                    <Form.Item label="Name" name="name">
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
        </div>
    );
};

const getFormValues = (values: Challenge): IChallengeCreateForm =>
    values
        ? ({
              ...values,
              inputType: (values.input_output as Record<string, any>).inputType,
              outputType: (values.input_output as Record<string, any>).outputType,
              inputOutput: (values.input_output as unknown as Record<string, unknown>).inputOutput,
          } as IChallengeCreateForm)
        : ({} as IChallengeCreateForm);
