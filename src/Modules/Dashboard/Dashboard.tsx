import { ChallengeAPIService } from '../Challenges/services/Challenge.API';

const Dashboard = () => {
    const handler = () => {
        // ExamAPIService.create({
        // CandidateAssessmenmtAPIService.create({
        //     // emailId: `test${getRandomNumber()}@test.com`,
        //     emailId: `test@test.com`,
        //     name: 'test',
        //     exam_id: 1,
        // })
        ChallengeAPIService.getAll().then((res) => {
            console.log(res);
        });
    };

    return <div onClick={handler}>Dashboard</div>;
};

export default Dashboard;
