import { Session } from "@supabase/supabase-js";
import { Difficulty } from "../../../types/Models";

export default abstract class CommonUtils {
    static getColor(difficulty: Difficulty) {
        switch (difficulty) {
            case Difficulty.easy:
                return 'green';
            case Difficulty.medium:
                return 'orange';
            case Difficulty.hard:
                return 'red';
            default:
                return 'black';
        }
    }

    static isLoggedIn(session: Session) {
        return session?.user
    }
}