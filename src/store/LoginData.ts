import { createModel } from "@rematch/core";

const LoginData = createModel()({
  state: false, 
  reducers: {
    toggleLogIn(state) {
      return !state ;
    },
  },
  
});
export default LoginData
