import { Form, Input, Button, Layout, Row, Col } from 'antd';
import { useState } from 'react';

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
            <Row justify="center" align="middle" style={{ height: '100vh' }}>
                <Col span={12} style={{ width: '50%' }}>
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
                            <Input placeholder="Enter your email" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={props.loading}>
                                {props.action}
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Layout>
    );
}

export default LoginForm;
