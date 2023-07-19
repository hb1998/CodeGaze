import { Form, Input, Button, Checkbox } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { CandidateAssessmentAPIService } from './services/CandidateAssessment.API';
import Logo from '../../assets/Lumel_Logo.png';
import { toast } from 'react-toastify';
import { CandidateInsertDto } from '../../types/Models';
import { CandidateAPIService } from '../Candidate/services/Candidate.API';
import { ROUTES } from '../../constants/Route.constants';

interface FormValues {
    name: string;
    email: string;
}


const CandidateAssessment = () => {
    const navigate = useNavigate();

    const params = useParams();
    const examId = params.exam_id;

    const onSubmit = (values: FormValues) => {
        const userData = {
            emailId: values.email,
            name: values.name,
        };
        createUser(userData).then((candidateData) => {
            const candidateId = candidateData.id;
            navigate(`${ROUTES.CANDIDATE_ASSESSMENT}/${examId}/${candidateId}`);
        });
    };

    const createUser = async (userData: CandidateInsertDto) => {
        try {
            const candidateData = await CandidateAPIService.create(userData);
            return candidateData;
        } catch (error) {
            console.error('Error creating user:', error);
            toast.error('Error creating user');
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <div style={{
                display: 'flex',
                width: '30rem',
                gap: '2rem',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }} >
                <img src={Logo} alt="Lumel-Logo" style={{ width: '8rem' }} />
                <Form style={{ width: '100%', display: 'flex', gap: '0.5rem', flexDirection: 'column' }} onFinish={onSubmit} >
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
                    <Form.Item style={{ alignSelf: 'center' }} name="condition">
                        <Checkbox >I Agree all the terms and conditions</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ display: 'flex', margin: '0 auto' }}>
                            Next
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default CandidateAssessment;
