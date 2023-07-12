import React, { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { IRootModel } from '../store/IModels';
import { useState } from 'react';
import { Spin } from 'antd';
export interface IWrapperprops {
    children: React.ReactNode;
}
const ProtectedRoute: React.FC<IWrapperprops> = ({ children }) => {
    const authState: boolean = useSelector((state: IRootModel) => state.session.isLoggedIn);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!authState) {
            navigate('/');
        } else {
            setIsLoading(false);
        }
    }, [authState, isLoading]);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return <>{children}</>;
};
export default ProtectedRoute;
