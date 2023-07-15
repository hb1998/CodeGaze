import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '../common/CodeEditor/Editor';

interface AssessmentData {
    question: string;
}

function CodingPage() {
    const { assessmentID } = useParams<{ assessmentID: string }>();
    const [assessmentData, setAssessmentData] = useState<AssessmentData>();

    const fetchAssessmentData = async (assessmentID: string): Promise<AssessmentData> => {
        try {
            const response = await fetch(`endpoint/${assessmentID}`);
            const data = await response.json();
            return data;
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
