import { supabase } from "../../Modules/API/supabase";
import { Candidate } from "../../types/Models";


const candidate = {
    state: <Candidate>{},
    reducers: {
        update(_state: Candidate, payload: Candidate): Candidate {
            return payload
        },
        clearToken(state: Candidate): Candidate {
            return <Candidate>{
                ...state,
                token: null
            }
        }
    },
    effects: {
        clearToken(): void {
            supabase.functions.setAuth(null)
        }
    }
};

export default candidate;