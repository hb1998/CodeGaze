import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Spin } from 'antd';
import { IRootState } from '../store';
import CommonUtils from '../Modules/common/utils/Common.utils';
export interface IWrapperprops {
    children: React.ReactNode;
}
const ProtectedRoute: React.FC<IWrapperprops> = ({ children }) => {
    const session = useSelector((state: IRootState) => state.session);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (!CommonUtils.isLoggedIn(session) && !session.loading) {
            navigate('/');
        } else {
            setIsLoading(false);
        }
    }, [session, isLoading, navigate]);

    if (session.loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return <>{children}</>;
};
export default ProtectedRoute;
