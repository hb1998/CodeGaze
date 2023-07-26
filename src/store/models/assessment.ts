import { Assessment } from "../../types/Models";


const assessment = {
    state: <Assessment>{},
    reducers: {
        update(_state: Assessment, payload: Assessment): Assessment {
            return payload
        },
        clear(): Assessment {
            return <Assessment>{}
        }
    },
};

export default assessment;