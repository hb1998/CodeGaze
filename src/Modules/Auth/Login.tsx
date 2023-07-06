import Userdata from "./Userdata";
import { LoginData } from "./Userdata";
import { supabase } from "./client";

const Login = () => {
  const getUserData = async (userData: LoginData) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userData.Email,
        password: userData.Password,
      });
      if (data.user) {
        console.log(data, "got user data");
      } else {
        throw new Error("Invalid credential Or not user found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onLogin = (data: LoginData) => {
    getUserData(data);
  };

  return (
    <>
      <Userdata action="Log In" SubmitHandler={onLogin} />
    </>
  );
};

export default Login;
