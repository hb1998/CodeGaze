import { Layout, Menu } from 'antd';
import { Routes, Route, Link } from 'react-router-dom';
import Exam from './Modules/Exam/Exam';
import Challenges from './Modules/Challenges/Challenges';
import Dashboard from './Modules/Dashboard/Dashboard';
import Candidates from './Modules/Candidate/Candidates';
import { UserOutlined } from '@ant-design/icons';
import Login from './Modules/Auth/Login';
import Register from './Modules/Auth/Register';
import Open from './Modules/Exam/Open/Open';
import Analytics from './Modules/Exam/Analytics/Analytics';
import './App.css';
import { useSelector } from 'react-redux';
import { IRootState } from './store';
import Auth from './Modules/Auth/Auth';
import ProtectedRoute from './Routes/ProtectedRoute';
import account from './Modules/Account/Account';
import Account from './Modules/Account/Account';

const { Header, Content } = Layout;

const Home = () => {
    const { isLoggedIn } = useSelector((state: IRootState) => state.session);

    return (
        <Layout className="main-layout">
            {isLoggedIn && (
                <Header>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['dashboard']}>
                        <Menu.Item key="dashboard">
                            <Link to={'/dashboard'}>Dashboard</Link>
                        </Menu.Item>
                        <Menu.Item key="assessments">
                            <Link to={'/assessments/open'}>Assessments</Link>
                        </Menu.Item>
                        <Menu.Item key="challenges">
                            <Link to={'/challenges'}>Challenges</Link>
                        </Menu.Item>
                        <Menu.Item key="candidates">
                            <Link to={'/candidates'}>Candidates</Link>
                        </Menu.Item>
                        <Menu.Item key="account" style={{ marginLeft: 'auto' }}>
                            <Link to={'/account'}>
                                Lumel &nbsp;
                                <UserOutlined />
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Header>
            )}
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    <Routes>
                        <Route path="/" Component={Auth} />
                        <Route path="Login" Component={Login} />
                        <Route path="Register" Component={Register} />
                        <Route path="dashboard" Component={Dashboard} />

                        <Route path="assessments" Component={Exam}>
                            <Route index path="open" Component={Open} />
                            <Route path="analytics" Component={Analytics} />
                        </Route>

                        <Route path="/challenges" Component={Challenges} />
                        <Route path="/candidates" Component={Candidates} />
                        <Route path="/account" Component={Account} />
                    </Routes>
                </div>
            </Content>
        </Layout>
    );
};

export default Home;
