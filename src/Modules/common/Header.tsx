import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu, MenuProps } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../API/supabase';
import { ROUTES } from '../../constants/Route.constants';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';

const HeaderComponent = () => {
    const navigate = useNavigate();
    const session = useSelector((state: IRootState) => state.session);
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <Link to={'/account/admin'}>My account</Link>,
            icon: <UserOutlined />,
        },
        {
            key: '2',
            label: <div>Logout</div>,
            icon: <LogoutOutlined />,
        },
    ];

    const handleLogout = async ({ key }) => {
        if (key === '1') return;
        const { error } = await supabase.auth.signOut();
        console.log(error);
        navigate(ROUTES.LOGIN);
    };
    return (
        <Header>
            <Menu theme="dark" mode="horizontal"  defaultSelectedKeys={['dashboard']}>
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
                    <Dropdown menu={{ items, onClick: handleLogout }} placement="top" arrow={{ pointAtCenter: true }}>
                        <div>
                            {session?.user?.email} &nbsp;
                            <UserOutlined />
                        </div>
                    </Dropdown>
                </Menu.Item>
            </Menu>
        </Header>
    );
};

export default HeaderComponent;
