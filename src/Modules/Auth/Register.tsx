import { useNavigate } from 'react-router';
import LoginForm, { ILoginData } from './LoginForm';
import { supabase } from '../API/supabase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Register() {
    const navigate = useNavigate();
    const onRegister = (data: ILoginData) => {
        const instruct = (message: string) => toast(message);

        const storeData = async (data: ILoginData) => {
            try {
                const userInfo = await supabase.auth.signUp({
                    email: data.Email,
                    password: data.Password,
                });
            } catch (error) {
                instruct('User Already exists');
            }
            alert('please confrim your email and login');
            navigate('/Login');
        };

        storeData(data);
    };

    return (
        <>
            <LoginForm action="Register" SubmitHandler={onRegister} />
            <ToastContainer />
        </>
    );
}
