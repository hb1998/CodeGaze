import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CandidateAssessmentAPIService } from './services/CandidateAssessment.API';
import EditorContainer from '../common/CodeEditor/EditorContainer';

type AssessmentDataResponse = Awaited<ReturnType<typeof CandidateAssessmentAPIService.getByExam>>;

function CodingPage() {
    const { assessmentID } = useParams<{ assessmentID: string }>();
    const [assessmentData, setAssessmentData] = useState<AssessmentDataResponse>();

    const fetchAssessmentData = async (assessmentID: string) => {
        try {
            // const response = await fetch(`endpoint/${assessmentID}`);
            const response = await CandidateAssessmentAPIService.getByExam(+assessmentID);
            // const data = await response.json();
            return response;
        } catch (error) {
            throw new Error('Error fetching assessment data');
        }
    };

    useEffect(() => {
        fetchAssessmentData(assessmentID)
            .then((data) => setAssessmentData(data))
            .catch((error) => console.error(error));
    }, [assessmentID]);

    return <>{assessmentData ? <EditorContainer /> : <div>Loading...</div>}</>;
}

export default CodingPage;
