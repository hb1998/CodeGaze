import { supabase } from '../API/supabase';
import { ILoginData } from './LoginForm';
import { IRootModel } from '../../store/IModels';
import { useSelector, useDispatch } from 'react-redux';
import { IDispatch } from '../../store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router';
const Login = () => {
    const dispatch = useDispatch<IDispatch>();
    // const count = useSelector((state: IRootModel) => state.session);
    const navigate = useNavigate();
    const onLogin = (data: ILoginData) => {
        const instruct = (message: string) => toast(message);

        const getUserData = async (userData: ILoginData) => {
            try {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: userData.Email,
                    password: userData.Password,
                });
                if (data.user) {
                    dispatch.session.update({ isLoggedIn: true, session: data.session });
                    navigate('/');
                } else {
                    throw new Error('Invalid credential Or not user found');
                }
            } catch (error) {
                instruct('Please enter a valid credentials to log in');
            }
        };
        getUserData(data);
    };

    return (
        <>
            <LoginForm action="Log In" SubmitHandler={onLogin} />
            <ToastContainer />
        </>
    );
};

export default Login;
