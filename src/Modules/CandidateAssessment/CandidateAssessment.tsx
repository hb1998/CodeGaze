import { Form, Input, Button, Checkbox } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Logo from '../../assets/Lumel_Logo.png';
import { toast } from 'react-toastify';
import { Candidate, CandidateInsertDto } from '../../types/Models';
import { ROUTES } from '../../constants/Route.constants';
import { useState } from 'react';
import { supabase } from '../API/supabase';
import { FUNCTIONS } from '../../constants/functions.constants';
import { useDispatch } from 'react-redux';
import { IDispatch } from '../../store';
import { FunctionsHttpError } from '@supabase/supabase-js';

interface FormValues {
    name: string;
    email: string;
}

const CandidateAssessment = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<IDispatch>();
    const params = useParams();
    const examId = params.examId;

    const onSubmit = (values: FormValues) => {
        setLoading(true);
        const userData = {
            emailId: values.email,
            name: values.name,
        };
        createCandidate(userData)
            .then((candidateData: Candidate) => {
                setLoading(false);
                const candidateId = candidateData.id;
                dispatch.candidate.update(candidateData);
                navigate(`${ROUTES.CANDIDATE_ASSESSMENT}/${examId}/${candidateId}`);
            })
            .catch((error) => {
                setLoading(false);
                console.error('Error creating user:', error);
                toast.error(error.message ?? 'Error creating user');
            });
    };

    const createCandidate = async (candidateData: CandidateInsertDto) => {
        const { data, error } = await supabase.functions.invoke<CandidateInsertDto>(FUNCTIONS.CREATE_CANDIDATE, {
            body: candidateData,
        });
        setLoading(false);
        if (error) {
            if (error instanceof FunctionsHttpError) {
                const errorMessage = await error.context.json();
                throw new Error(errorMessage.error);
            } else {
                throw error;
            }
        }
        return data;
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
            <div
                style={{
                    display: 'flex',
                    width: '30rem',
                    gap: '2rem',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <img src={Logo} alt="Lumel-Logo" style={{ width: '8rem' }} />
                <Form
                    style={{ width: '100%', display: 'flex', gap: '0.5rem', flexDirection: 'column' }}
                    onFinish={onSubmit}
                >
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
                    {/* <Form.Item
                        style={{ alignSelf: 'center' }}
                        rules={[
                            {
                                required: true,
                                validator: (_, value) => {
                                    if (value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Please agree to the terms and conditions'));
                                },
                            },
                        ]}
                        name="condition"
                    >
                        <Checkbox>
                            I Agree all the <a>Terms and conditions</a>
                        </Checkbox>
                    </Form.Item> */}
                    <Form.Item>
                        <Button
                            loading={loading}
                            type="primary"
                            htmlType="submit"
                            style={{ display: 'flex', margin: '0 auto' }}
                        >
                            Next
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default CandidateAssessment;
