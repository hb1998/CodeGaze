import { Session } from "@supabase/supabase-js";


interface SessionWithExtras extends Session {
  loading: boolean;
}

const userSession = {
  state: <SessionWithExtras>{
    loading: true,
  },
  reducers: {
    update(_state: SessionWithExtras, payload: Session): SessionWithExtras {
      return { ...payload, loading: false };
    }
  },
};

export default userSession;