import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '../common/CodeEditor/Editor';
import { CandidateAssessmenmtAPIService } from './services/CandidateAssessment.API';

interface AssessmentData {
    question: string;
}

function CodingPage() {
    const { assessmentID } = useParams<{ assessmentID: string }>();
    const [assessmentData, setAssessmentData] = useState<AssessmentData>();

    const fetchAssessmentData = async (assessmentID: string) => {
        try {
            // const response = await fetch(`endpoint/${assessmentID}`);
            const response = await CandidateAssessmenmtAPIService.getByExam(+assessmentID);
            // const data = await response.json();
            return response;
        } catch (error) {
            throw new Error('Error fetching assessment data');
        }
    };

    useEffect(() => {
        console.log(assessmentID);
        fetchAssessmentData(assessmentID)
            .then((data) => setAssessmentData(data))
            .catch((error) => console.error(error));
    }, [assessmentID]);

    return <>{assessmentData ? <Editor /> : <div>Loading...</div>}</>;
}

export default CodingPage;
