import { Layout, Tabs, TabsProps } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet, useNavigate } from 'react-router';

export default function Account() {
    const navigate = useNavigate();

    const items: TabsProps['items'] = [
        {
            key: 'admin',
            label: 'Admin',
        },
        {
            key: 'personal-settings',
            label: 'Personal settings',
        },
    ];

    const onChange = (key: string) => {
        navigate(key);
    };

    return (
        <Layout className="container">
            <Tabs onChange={onChange} items={items} defaultActiveKey="admin" onTabClick={(key) => navigate(key)} />
            <Content>
                <Outlet />
            </Content>
        </Layout>
    );
}
