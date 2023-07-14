import { Layout, Menu, Popover } from 'antd';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Exam from './Modules/Exam/Exam';
import Challenges from './Modules/Challenges/Challenges';
import Dashboard from './Modules/Dashboard/Dashboard';
import Candidates from './Modules/Candidate/Candidates';
import { UserOutlined } from '@ant-design/icons';
import Login from './Modules/Auth/Login';
import Open from './Modules/Exam/Open/Open';
import Analytics from './Modules/Exam/Analytics/Analytics';
import './App.css';
import { useSelector } from 'react-redux';
import { IRootState } from './store';
import Editor from './Modules/common/CodeEditor/Editor';
import ProtectedRoute from './Routes/ProtectedRoute';
import Account from './Modules/Account/Account';
import NavItem from './Modules/Account/NavItem';
import Admin from './Modules/Account/Admin';
import PersonalSettings from './Modules/Account/PersonalSettings';
import Recover from './Modules/Auth/Recover';
import Update from './Modules/Auth/Update';
import CandidateAssessment from './Modules/CandidateAssessment/CandidateAssessment';
const { Header, Content } = Layout;

const getProtectedRoute = (component: React.ReactNode) => {
    return <ProtectedRoute>{component}</ProtectedRoute>;
};

const Home = () => {
    const session = useSelector((state: IRootState) => state.session);
    const location = useLocation();
    const route = location.pathname.split('/')[1];
    const showHeader = route !== 'Login' && session
    return (
        <Layout className="main-layout">
            {showHeader && (
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
                            <Popover content={<NavItem />} title="Account Details" trigger="click">
                                Lumel &nbsp;
                                <UserOutlined />
                            </Popover>
                        </Menu.Item>
                    </Menu>
                </Header>
            )}
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    <Routes>
                        <Route path="/" element={<Navigate to="/Login" />} />
                        <Route path="Login" Component={Login} />
                        <Route path="/RecoverUser" Component={Recover} />
                        <Route path="/updateUser" Component={Update} />

                        <Route path="dashboard" element={getProtectedRoute(<Dashboard />)} />

                        <Route path="assessments" element={getProtectedRoute(<Exam />)}>
                            <Route index path="open" element={getProtectedRoute(<Open />)} />
                            <Route path="analytics" element={getProtectedRoute(<Analytics />)} />
                        </Route>

                        <Route path="/challenges" element={getProtectedRoute(<Challenges />)} />
                        <Route path="/candidates" element={getProtectedRoute(<Candidates />)} />
                        <Route path="/account" element={getProtectedRoute(<Account />)}>
                            <Route index path="admin" element={getProtectedRoute(<Admin />)} />
                            <Route path="personal_settings" element={getProtectedRoute(<PersonalSettings />)} />
                        </Route>
                        <Route path="/challenges/:id" element={getProtectedRoute(<Editor />)} />
                        <Route path="/editor" element={<Editor />} />
                        <Route path="/candidateAssessment" element={<CandidateAssessment />} />
                    </Routes>
                </div>
            </Content>
        </Layout>
    );
};

export default Home;
