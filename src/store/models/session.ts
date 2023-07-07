export interface IToken {
  access_token: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

export interface ISession{
  isLoggedIn:boolean
  session:IToken
}


const userSession = {
  state: <ISession>{
      isLoggedIn: false,
      session:{}
  },
  reducers: {
      update(state: ISession, payload: Partial<ISession>): ISession {
          return { ...state, ...payload };
      }
  },
};

export default userSession;