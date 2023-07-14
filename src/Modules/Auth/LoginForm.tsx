import { Form, Input, Button, Layout, Row, Col } from 'antd';
import { useState } from 'react';
import logo from '../../assets/Lumel_Logo.png';
import { Link } from 'react-router-dom';

export interface ILoginData {
    Email: string;
    Password: string;
}

interface IDataProps {
    action: string;
    SubmitHandler: (v: ILoginData) => void;
    show?: boolean;
    loading?: boolean;
}

function LoginForm(props: IDataProps) {
    const onFinish = (values: ILoginData) => {
        props.SubmitHandler(values);
    };

    const emailValidator = (rule: any, value: any, callback: any) => {
        if (value && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            callback('Please enter a valid email address!');
        } else {
            callback();
        }
    };

    return (
        <Layout>
            <div
                style={{
                    display: 'grid',
                    placeContent: 'center',
                    height: '100vh',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '20px',
                    }}
                >
                    <img src={logo} alt="" style={{ width: '150px', height: '80px' }} />
                </div>
                <Row justify="center" align="middle">
                    <Col span={12} style={{ width: '500px' }}>
                        <Form name="login-form" onFinish={onFinish}>
                            <Form.Item
                                name="Email"
                                rules={[
                                    { required: true, message: 'Please enter your email!' },
                                    { validator: emailValidator, validateTrigger: 'blur' },
                                ]}
                            >
                                <Input placeholder="Enter your email" />
                            </Form.Item>
                            <Form.Item
                                name="Password"
                                rules={[
                                    { required: true, message: 'Please enter your password!' },
                                    {
                                        min: 8,
                                        message: 'Password must be at least 8 characters long',
                                    },
                                ]}
                            >
                                <Input.Password placeholder="Enter your password" />
                            </Form.Item>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" loading={props.loading}>
                                        {props.action}
                                    </Button>
                                </Form.Item>

                                <Form.Item>
                                    <Link to="/RecoverUser">
                                        <Button type="primary" htmlType="button">
                                            Forgot password
                                        </Button>
                                    </Link>
                                </Form.Item>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </div>
        </Layout>
    );
}

export default LoginForm;
