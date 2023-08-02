import React from 'react';
import { Button, Col, Form, FormListFieldData, Input, Row, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { validateInputBasedOnOption } from './ValidateInput';
import { IParamType, ParamType } from '../../types/Evaluator.types';
import CodeMirror from '@uiw/react-codemirror';
import { jsonLanguage } from '@codemirror/lang-json';

const { Text } = Typography;

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
};
const TestCases: React.FC = () => {
    const form = Form.useFormInstance();
    return (
        <>
            <Text>Required testcases</Text>
            <br />
            <Form.List name="inputOutput">
                {(fields, { add, remove }) => (
                    <>
                        <Row style={{ width: '100%' }}>
                            {fields.map((field) => (
                                <Row gutter={16} style={{ width: '100%' }} key={field.key}>
                                    <Col span={11}>
                                        <Form.Item
                                            shouldUpdate={(prevValues, curValues) =>
                                                prevValues.inputType !== curValues.inputType
                                            }
                                        >
                                            <Form.List
                                                name={[field.name, 'input']}
                                                initialValue={getInitialValue(form.getFieldValue('inputType'))}
                                            >
                                                {(fields) => (
                                                    <div>
                                                        {fields.map((field) => {
                                                            const type = form.getFieldValue('inputType')[field.key]
                                                                ?.type as ParamType;
                                                            return (
                                                                <Form.Item
                                                                    style={{ marginBottom: 8 }}
                                                                    {...field}
                                                                    rules={[
                                                                        {
                                                                            validator: validateInputBasedOnOption(type),
                                                                        },
                                                                    ]}
                                                                >
                                                                    <InputOutputRenderer type={type} />
                                                                </Form.Item>
                                                            );
                                                        })}
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
                                            rules={[{ validator: validateInputBasedOnOption('') }]}
                                        >
                                            <InputOutputRenderer
                                                type={form.getFieldValue('outputType')?.type as ParamType}
                                            />
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
                )}
            </Form.List>
        </>
    );
};

interface InputOutputRendererProps {
    type: ParamType;
    value?: string;
    onChange?: (value: any) => void;
}
const InputOutputRenderer: React.FC<InputOutputRendererProps> = (props: InputOutputRendererProps) => {
    const { type, value, onChange } = props;
    switch (type) {
        case ParamType.OBJECT:
        case ParamType.ARRAY_OF_OBJECT:
            return (
                <CodeMirror
                    className="input-output-renderer"
                    height="100px"
                    value={value}
                    onChange={onChange}
                    theme={'light'}
                    basicSetup={{
                        lineNumbers: false,
                        foldGutter: false,
                    }}
                    extensions={[jsonLanguage]}
                />
            );
        default:
            return <Input value={value} onChange={(value) => onChange(value)} placeholder="Input" />;
    }
};

export default TestCases;
