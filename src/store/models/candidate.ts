import { supabase } from "../../Modules/API/supabase";
import { Candidate } from "../../types/Models";


const candidate = {
    state: <Candidate>{},
    reducers: {
        update(_state: Candidate, payload: Candidate): Candidate {
            return payload
        },
        clear(): Candidate {
            return <Candidate>{}
        }
    },
    effects: {
        clear(): void {
            supabase.functions.setAuth(null)
        }
    }
};

export default candidate;