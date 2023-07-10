import React, { useState } from 'react';
import ProtectedRoute from '../../Routes/ProtectedRoute';
import { Button, Col, Layout, Row } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { useDispatch } from 'react-redux';
import { IDispatch } from '../../store';

export default function Account() {
    const dispatch = useDispatch<IDispatch>();
    const [isloading, setLoading] = useState(false);
    const logoutHandler = () => {
        setLoading(true);
        dispatch.session.update({ isLoggedIn: false, session: {} });
        setLoading(false);
    };
    return (
        <ProtectedRoute>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                <Layout>
                    <Content>
                        <Row justify="center">
                            <Col span={8}>
                                <div style={{ textAlign: 'center' }}>
                                    <h2>User Name</h2>
                                    <p>Access Status</p>
                                    <Button type="primary" loading={isloading} onClick={logoutHandler}>
                                        Logout
                                    </Button>
                                </div>
                            </Col>
                        </Row>

                        {/* Your content goes here */}
                    </Content>
                </Layout>
            </div>
        </ProtectedRoute>
    );
}
