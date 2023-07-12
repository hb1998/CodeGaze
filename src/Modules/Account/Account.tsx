import React, { useState } from 'react';
import { Button, Col, Layout, Row, Tabs } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { useDispatch } from 'react-redux';
import { IDispatch } from '../../store';

import { Outlet, useNavigate } from 'react-router';
const { TabPane } = Tabs;

export default function Account() {
    const dispatch = useDispatch<IDispatch>();
    const [isloading, setLoading] = useState(false);
    const logoutHandler = () => {
        setLoading(true);
        dispatch.session.update({ isLoggedIn: false, session: {} });
        setLoading(false);
    };
    const navigate = useNavigate();

    return (
        <>
            <Layout>
                <header>
                    <div style={{ padding: '5px' }}>
                        <Tabs defaultActiveKey="1" onTabClick={(key) => navigate(key)}>
                            <TabPane tab="Admin" tabKey="admin" key="admin"></TabPane>
                            <TabPane
                                tab="Personal settings"
                                tabKey="personal settings"
                                key="personal_settings"
                            ></TabPane>
                        </Tabs>
                        <Content>
                            <Outlet />
                        </Content>
                    </div>
                </header>
            </Layout>
        </>
    );
}
{
    /* <Button type="primary" loading={isloading} onClick={logoutHandler}>
Logout
</Button> */
}
