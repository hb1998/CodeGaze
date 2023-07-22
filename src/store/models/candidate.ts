import { Candidate } from "../../types/Models";


const candidate = {
    state: <Candidate>{},
    reducers: {
        update(_state: Candidate, payload: Candidate): Candidate {
            return payload
        }
    },
};

export default candidate;