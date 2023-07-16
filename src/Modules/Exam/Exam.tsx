import { Layout, Tabs } from 'antd';
import Title from 'antd/es/typography/Title';
import { Outlet, useNavigate } from 'react-router-dom';
import './styles/Exam.css'

const { TabPane } = Tabs;
const { Content } = Layout;

const Exam = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <header>
                <Title>Exam</Title>
                <div style={{ padding: '5px' }}>
                    <Tabs defaultActiveKey="open" onTabClick={(key) => navigate(key)}>
                        <TabPane tab="Open" tabKey="open" key="open"></TabPane>
                        <TabPane tab="Analytics" tabKey="analytics" key="analytics"></TabPane>
                    </Tabs>
                    <Content>
                        <Outlet />
                    </Content>
                </div>
            </header>
        </Layout>
    );
};

export default Exam;
