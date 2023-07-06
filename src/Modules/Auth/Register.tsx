import { useNavigate } from "react-router";
import Userdata, { LoginData } from "./Userdata";
import { supabase } from "./client";

export default function Register() {
  const navigate = useNavigate();
  const storeData = async (data: LoginData) => {
    try {
      const userInfo = await supabase.auth.signUp({
        email: data.Email,
        password: data.Password,
      });
    } catch (error) {
      console.log(error);
    }
    alert("please confrim your email and login");
    navigate("/Login");
  };

  const onRegister = (data: LoginData) => {
    storeData(data);
  };

  return <Userdata action="Register" SubmitHandler={onRegister} />;
}
