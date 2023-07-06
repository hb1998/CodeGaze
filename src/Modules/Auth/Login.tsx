import { supabase } from "../API/supabase";
import Userdata from "./Userdata";
import { LoginData } from "./Userdata";
import { IRootModel } from "../../store/IModels";
import { useSelector, useDispatch } from "react-redux";
import { IDispatch } from "../../store";

const Login = () => {
  const dispatch = useDispatch<IDispatch>();
  const count = useSelector((state: IRootModel) => state.session);

  console.log(count);
  const getUserData = async (userData: LoginData) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userData.Email,
        password: userData.Password,
      });
      if (data.user) {
        console.log(data, "got user data", count);
        dispatch.session.update({ isLoggedIn: true });
        // console.log(count);
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
