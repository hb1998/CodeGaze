

export interface ISession{
  isLoggedIn:boolean
}


const userSession = {
  state: <ISession>{
      isLoggedIn: false,
  },
  reducers: {
      update(state: ISession, payload: Partial<ISession>): ISession {
          return { ...state, ...payload };
      }
  },
};

export default userSession;