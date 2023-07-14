import { supabase } from '../API/supabase';
import { ILoginData } from './LoginForm';
import { IRootModel } from '../../store/IModels';
import { useDispatch } from 'react-redux';
import { IDispatch } from '../../store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import './styles/Auth.css'


const Login = () => {
    const dispatch = useDispatch<IDispatch>();
    const [loading, setLoading] = useState(false);

    // const count = useSelector((state: IRootModel) => state.session);
    const navigate = useNavigate();
    const onLogin = async (userData: ILoginData) => {
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: userData.Email,
                password: userData.Password,
            });
            if (data.user) {
                dispatch.session.update({ isLoggedIn: true, session: data.session });
                navigate('/dashboard', { replace: true });
            } else {
                toast.error('Please enter a valid credentials to log in');
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <>
            <LoginForm action="Log In" loading={loading} SubmitHandler={onLogin} />
        </>
    );
};

export default Login;
