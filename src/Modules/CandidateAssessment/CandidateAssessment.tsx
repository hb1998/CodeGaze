import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CandidateAssessmenmtAPIService } from './services/CandidateAssessment.API';
import Logo from '../../assets/Lumel_Logo.png';

interface FormValues {
    name: string;
    email: string;
}

interface CandidateAssessmentProps {
    examId: number;
}

const CandidateAssessment = ({ examId }: CandidateAssessmentProps) => {
    const navigate = useNavigate();
    const onSubmit = (values: FormValues) => {
        const userData = {
            emailId: values.email,
            name: values.name,
        };
        // createUser(userData).then((assessmentData) => {
        //     const candidateId = assessmentData.candidateId; // Assuming `candidateId` is returned from the API response
        //     navigate.push(`/${examId}/${candidateId}`);
        // });
        createUser(userData).then((assessmentData) => {
            const candidateId = assessmentData.candidate_id;
            navigate(`/${examId}/${candidateId}`);
        });
        const candidateId = 1;
        navigate(`/exam_id/${examId}/candidate_id/${candidateId}`);
        console.log('Submitted values:', values);
    };

    const createUser = async (userData: object) => {
        try {
            const assessmentData = await CandidateAssessmenmtAPIService.create(userData);
            console.log('User created:', assessmentData);
            return assessmentData;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Error creating user');
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <img src={Logo} alt="Lumel-Logo" style={{ width: '8rem' }} />
            <Form onFinish={onSubmit} labelCol={{ span: 6 }}>
                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please enter your email address' },
                        { type: 'email', message: 'Please enter a valid email address' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ display: 'flex', margin: '0 auto' }}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CandidateAssessment;
