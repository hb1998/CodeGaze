import React, { useState } from 'react';
import { Button, Col, Layout, Row, Tabs, TabsProps } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { useDispatch } from 'react-redux';
import { IDispatch } from '../../store';

import { Outlet, useNavigate } from 'react-router';
import Admin from './Admin';
import PersonalSettings from './PersonalSettings';
const { TabPane } = Tabs;

export default function Account() {
    const dispatch = useDispatch<IDispatch>();
    const [isloading, setLoading] = useState(false);

    const navigate = useNavigate();

    const items: TabsProps['items'] = [
        {
            key: 'admin',
            label: 'Admin',
        }, {
            key: 'personal-settings',
            label: 'Personal settings',
        }
    ];

    const onChange = (key: string) => {
        navigate(key);
    };

    return (
        <>
            <Layout>
                <header>
                    <div style={{ padding: '5px' }}>
                        <Tabs onChange={onChange} items={items} defaultActiveKey="admin" onTabClick={(key) => navigate(key)} />
                        <Content>
                            <Outlet />
                        </Content>
                    </div>
                </header>
            </Layout>
        </>
    );
}
