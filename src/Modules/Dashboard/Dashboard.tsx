import { CandidateAssessmenmtAPIService } from '../CandidateAssessment/services/CandidateAssessment.API';
import { ChallengeAPIService } from '../Challenges/services/Challenge.API';
import { CodeGenerator, IInputType, Language } from '../CodeGeneration/CodeGenerator';
import { ExamAPIService } from '../Exam/services/Exam.api';

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

function getRandomNumber() {
    return Math.floor(Math.random() * 1000) + 1;
}

const language = Language.CPP;
const inputTypes: IInputType[] = [
    { type: 'string', name: 'strParam' },
    { type: 'number', name: 'numParam' },
];
const outputTypes = ['boolean'];

// Call the function to generate starter code
const codeGenerator = new CodeGenerator(language, inputTypes, outputTypes);
const starterCode = codeGenerator.generateStarterCode();

// Print the generated starter code
console.log(starterCode);
