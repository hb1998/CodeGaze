import { useParams } from 'react-router';

const QuestionsComponent = () => {
    const { examId, candidateId } = useParams();

    return (
        <div>
            <h1>Questions</h1>
            <p>Exam ID: {examId}</p>
            <p>Candidate ID: {candidateId}</p>
        </div>
    );
};

export default QuestionsComponent;
