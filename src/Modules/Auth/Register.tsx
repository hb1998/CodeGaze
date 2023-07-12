import { useNavigate } from 'react-router';
import LoginForm, { ILoginData } from './LoginForm';
import { supabase } from '../API/supabase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
export default function Register() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const onRegister = async (data: ILoginData) => {
        setLoading(true);
        try {
            const userInfo = await supabase.auth.signUp({
                email: data.Email,
                password: data.Password,
            });
        } catch (error) {
            toast.error('User Already exists please enter another user');
            navigate('/Register', { replace: true });
            setLoading(false);
            setTimeout(() => {
                window.location.reload();
            }, 4000);
            return;
        }
        setLoading(false);
        alert('please confrim your email and login');
        navigate('/Login', { replace: true });
    };

    return (
        <>
            <LoginForm action="Register" loading={loading} SubmitHandler={onRegister} />
        </>
    );
}
