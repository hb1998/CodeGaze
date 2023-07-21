import { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Table } from 'antd';
import { supabase } from '../API/supabase';
import dayjs from 'dayjs';
import { FUNCTIONS } from '../../constants/functions.constants';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { toast } from 'react-toastify';
interface IEmailProps {
    emailId: string;
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
        render: (date: string) => (date ? dayjs(date).format('hh:mm A, MMM YY') : 'Never'),
    },
];
function Admin() {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [usersLoading, setUserLoading] = useState(true);
    const [form] = Form.useForm();

    const session = useSelector((state: IRootState) => state.session);

    const emailValidator = (rule: any, value: any, callback: any) => {
        if (value && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            callback('Please enter a valid email address!');
        } else {
            callback();
        }
    };

    const fetchUsers = async () => {
        try {
            const { data, error } = await supabase.functions.invoke(FUNCTIONS.GET_USERS);
            if (error) throw error;
            setUsers(data);
            setUserLoading(false);
        } catch (error) {
            setUserLoading(false);
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async (details: IEmailProps) => {
        setModalLoading(true);
        try {
            const { data, error } = await supabase.functions.invoke(FUNCTIONS.INVITE_USER, {
                body: {
                    type: 'invite',
                    emailId: details.emailId,
                },
            });
            fetchUsers();
            console.log(data)
            if(error) throw error;
            toast.success(`${details.emailId} invited successfully`);
            setModalLoading(false);
            setModalVisible(false);
            form.resetFields();
        } catch (error) {
            setModalLoading(false);
            setModalVisible(false);
        }
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
                    open={modalVisible}
                    okText="Invite user"
                    onCancel={() => {
                        form.resetFields();
                        setModalVisible(false);
                    }}
                    footer={null}
                >
                    <Form form={form} onFinish={handleSubmit}>
                        <Form.Item
                            name="emailId"
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
}

export default Admin;
