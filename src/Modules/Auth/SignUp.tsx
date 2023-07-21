import { Button, Form, Input, Layout } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import lumelLogo from '../../assets/Lumel_Logo.png';
import { supabase } from '../API/supabase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../constants/Route.constants';
import { useState } from 'react';

const { Content } = Layout;

interface FormValues {
    password: string;
}

const SignUp = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSave = async (values: FormValues) => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.updateUser({ password: values.password });
            setLoading(false);
            if (error) throw error;
            toast.success('Password updated successfully');
            navigate(ROUTES.DASHBOARD);
        } catch (error) {
            setLoading(false);
            toast.error(error?.message || 'Error updating password');
        }
    };

    return (
        <Layout>
            <Content style={{ padding: '50px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
                    <img src={lumelLogo} alt="Logo" style={{ height: '50px', marginRight: '10px' }} />
                </div>
                <Form style={{ maxWidth: '25rem', margin: 'auto' }} onFinish={onSave}>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Please enter your password!' },
                            {
                                min: 8,
                                message: 'Password must be at least 8 characters long',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="New Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button loading={loading} type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Save Password
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    );
};

export default SignUp;
