import { Form, Input, Button, Checkbox } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Logo from '../../assets/Lumel_Logo.png';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import { Candidate, CandidateInsertDto } from '../../types/Models';
import { ROUTES } from '../../constants/Route.constants';
import { useEffect, useState } from 'react';
import { supabase } from '../API/supabase';
import { FUNCTIONS } from '../../constants/functions.constants';
import { useDispatch, useSelector } from 'react-redux';
import { IDispatch, IRootState } from '../../store';
import { FunctionsHttpError } from '@supabase/supabase-js';

interface FormValues {
    name: string;
    email: string;
}

const CandidateAssessment = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [sessionRestoreLoading, setSessionRestoreLoading] = useState(true);
    const dispatch = useDispatch<IDispatch>();
    const candidate = useSelector((state: IRootState) => state.candidate);
    const assessment = useSelector((state: IRootState) => state.assessment);
    const params = useParams();
    const examId = params.examId;

    useEffect(() => {
        if (candidate?.id && candidate?.token) {
            const expiry = (jwt_decode(candidate?.token) as { exp: number })?.exp;
            const now = Date.now() / 1000;
            const timeLeft = Math.round(expiry - now);
            if (timeLeft > 60) {
                if (assessment?.challenge_id) {
                    navigateToChallenge();
                } else {
                    setSessionRestoreLoading(false);
                    navigate(`${ROUTES.CANDIDATE_ASSESSMENT}/${examId}/${candidate.id}`);
                }
            } else {
                toast.error('Your session has expired');
            }
        } else {
            setSessionRestoreLoading(false);
        }
    }, [assessment, candidate, examId, navigate])

    const navigateToChallenge = async () => {
        try {
            await supabase.functions.setAuth(candidate.token);
            const { data: challenge, error } = await supabase.functions.invoke(FUNCTIONS.GET_CHALLENGE, {
                body: {
                    challengeId: assessment.challenge_id,
                },
            });
            if (error) throw error;
            toast.info('Session Restored')
            navigate(`${ROUTES.CANDIDATE_ASSESSMENT}/${examId}/${candidate.id}/${assessment.challenge_id}`, {
                state: {
                    challenge,
                    token: candidate?.token,
                },
            });
        } catch (error) {
            toast.error('Unable to restore your session');
        } finally {
            setSessionRestoreLoading(false);

        }
    }

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
                            disabled={sessionRestoreLoading}
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
