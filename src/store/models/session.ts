import { Session } from "@supabase/supabase-js";


interface SessionWithExtras extends Session {
  loading: boolean;
}

const userSession = {
  state: <SessionWithExtras>{
    loading: true,
  },
  reducers: {
    update(state: SessionWithExtras, payload: Partial<SessionWithExtras>): SessionWithExtras {
      return { ...state, ...payload, loading: false };
    }
  },
};

export default userSession;