import { Layout } from 'antd';
import Title from 'antd/es/typography/Title';
import { Outlet } from 'react-router-dom';
import './styles/Exam.css';

const { Content } = Layout;

const Exam = () => {

    return (
        <Layout className="container">
            <header>
                <Title>Exam</Title>
                <div style={{ padding: '5px' }}>
                
                    <Content>
                        <Outlet />
                    </Content>
                </div>
            </header>
        </Layout>
    );
};

export default Exam;
