import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { IDispatch } from '../../store';
import { Link } from 'react-router-dom';
export default function NavItem() {
    const [isloading, setLoading] = useState(false);
    const dispatch = useDispatch<IDispatch>();
    const logoutHandler = () => {
        setLoading(true);
        dispatch.session.update({ isLoggedIn: false, session: {} });
        setLoading(false);
    };

    return (
        <div>
            <div>
                <Link to={'/account'}>
                    My account&nbsp;
                    <UserOutlined />
                </Link>
            </div>
            <Button style={{ marginTop: '6px' }} type="primary" loading={isloading} onClick={logoutHandler}>
                Logout
            </Button>
        </div>
    );
}
