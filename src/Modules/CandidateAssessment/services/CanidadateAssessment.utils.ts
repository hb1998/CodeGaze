import dayjs from "dayjs";
import { AssessmentQueryResult } from "../../Dashboard/Dashboard";

export default class CandidateAssessmentUtils {
    static getTimeTaken(assessment: AssessmentQueryResult[number]) {
        if (assessment) {
            const timeTaken = dayjs(`${assessment.finished}+00:00`).diff(dayjs(assessment.created_at), 'minute');
            return isNaN(timeTaken) ? 'In Process' : `${timeTaken} minutes`;
        }
        return ''
    }

    static getScore(assessment: AssessmentQueryResult[number]) {
        const result = assessment?.result as unknown as Array<boolean> || [];
        const correctTestCases = result.reduce((acc, curr) => (curr ? acc + 1 : acc), 0) / result.length;
        const percentageOfCorrectTestCases = Math.round(correctTestCases * 100);
        return isNaN(percentageOfCorrectTestCases) ? 0 :percentageOfCorrectTestCases;
    }
}