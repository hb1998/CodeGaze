import { Card } from 'antd';

const AssessmentOver = () => {
    return (
        <Card style={{
            width: '100%',
            height: '100vh',
        }} title="Thank You">
            <p>Thank you for completing the interview assessment!</p>
            <p>If there were multiple questions in your assessment, Please begin that assessment</p>
            <p>Your results will be available soon. Please check your email for updates.</p>
        </Card>
    );
};

export default AssessmentOver;
