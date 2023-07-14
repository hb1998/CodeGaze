import React from 'react';
import { Form, Input, Modal, Select } from 'antd';
import MDEditor from '@uiw/react-md-editor';
import Validation from './Validation';

const { Option } = Select;


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

export const CollectionCreateForm: React.FC<ICollectionCreateFormProps> = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const [value, setValue] = React.useState('**Hello world!!!**');
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
                    <Form.Item name="Format Date">
                        <Input placeholder="Format Date" />
                    </Form.Item>
                    <Form.Item name="difficulty" label="Difficult Level">
                        <Select placeholder="Easy" allowClear >
                            <Option value="easy">Easy</Option>
                            <Option value="medium">Medium</Option>
                            <Option value="hard">Hard</Option>
                        </Select>
                    </Form.Item>
    
                    <Form.Item name="Short description" label="Short description">
                        <Input  />
                    </Form.Item>
                    <Form.Item name="editor" initialValue={value}>
                        <MDEditor
                            value={value}
                            onChange={(val) => {
                                setValue(val!);
                            }}
                        />
                    </Form.Item>
                    <Validation />
                </Form>
            </Modal>
        </div>
    );
};
