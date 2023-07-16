import { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Table } from 'antd';
import { supabase } from '../API/supabase';
import dayjs from 'dayjs';
interface IEmailProps {
    Email: string;
}

const adminTableDef = [
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Last Signed In',
        dataIndex: 'last_sign_in_at',
        render: (date: string) => date ? dayjs(date).format('hh:mm A, MMM YY') : 'Never',
    },

]
function Admin() {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [usersLoading, setUserLoading] = useState(true);
    const [form] = Form.useForm();
    const emailValidator = (rule: any, value: any, callback: any) => {
        if (value && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            callback('Please enter a valid email address!');
        } else {
            callback();
        }
    };

    const fetchUsers = async () => {
        try {
            const { data, error } = await supabase.auth.admin.listUsers();
            setUsers(data.users);
            setUserLoading(false);
        } catch (error) {
            setUserLoading(false);
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [])


    const handleSubmit = async (details: IEmailProps) => {
        setModalLoading(true);

        const { data, error } = await supabase.auth.admin.generateLink({
            type: 'invite',
            email: details.Email,
        });
        console.log(data, error);

        setModalLoading(false);
        setModalVisible(false);
        form.resetFields();
    };

    return (
        <div>
            <div style={{ position: 'relative' }}>
                <div style={{ textAlign: 'right', marginBottom: '15px' }}>
                    <Button type="primary" onClick={() => setModalVisible(true)}>
                        Add User
                    </Button>
                </div>
                <Modal
                    title="Enter email to invite"
                    visible={modalVisible}
                    okText="Invite user"
                    onCancel={() => {
                        form.resetFields();
                        setModalVisible(false);
                    }}
                    footer={null}
                >
                    <Form form={form} onFinish={handleSubmit}>
                        <Form.Item
                            name="Email"
                            rules={[
                                { required: true, message: 'Please enter your email!' },
                                { validator: emailValidator, validateTrigger: 'blur' },
                            ]}
                        >
                            <Input placeholder="Enter your email" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                loading={modalLoading}
                                type="primary"
                                htmlType="submit"
                                style={{ marginRight: '8px' }}
                            >
                                Invite
                            </Button>
                            <Button
                                type="default"
                                onClick={() => {
                                    form.resetFields();
                                    setModalVisible(false);
                                }}
                            >
                                cancel
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Table dataSource={users} columns={adminTableDef} loading={usersLoading} />
            </div>
        </div>
    );

    return <div>Admin</div>;
}

export default Admin;
