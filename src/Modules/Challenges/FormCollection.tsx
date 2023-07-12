import { Modal, Select } from 'antd';
import { Space, Typography } from 'antd';
const { Text } = Typography;
const { Option } = Select;

import React from 'react';
import { Form, Button, Input, Divider } from 'antd';



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
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{ modifier: 'public' }}
                >

                    
                </Form>
            </Modal>
        </div>
    );
};
