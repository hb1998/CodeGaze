import { Button, Divider, List, Skeleton, Typography } from 'antd';
import jwt_decode from 'jwt-decode';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Challenge } from '../../types/Models';
import { ROUTES } from '../../constants/Route.constants';
import './styles/Assessment.css';
import { supabase } from '../API/supabase';
import { FUNCTIONS } from '../../constants/functions.constants';
import { toast } from 'react-toastify';
import Timer from './components/Timer';
import { useDispatch, useSelector } from 'react-redux';
import { IDispatch, IRootState } from '../../store';
const { Title } = Typography;

const ChallengesListComponent = () => {
    const { examId, candidateId } = useParams();
    const candidate = useSelector((state: IRootState) => state.candidate);
    const [loading, setLoading] = useState(true);
    const [beginLoading, setBeginLoading] = useState(false);
    const [challenges, setchallenges] = useState<Challenge[]>([]);

    const navigate = useNavigate();
    const dispatch = useDispatch<IDispatch>();
    const fetchExam = async () => {
        try {
            if (!candidate?.token) throw new Error('No token found');
            await supabase.functions.setAuth(candidate.token);
            const { data, error } = await supabase.functions.invoke(FUNCTIONS.GET_EXAM, {
                body: {
                    examId,
                },
            });
            const challenges = data?.challenge as Challenge[];
            setchallenges(challenges);
            if (error) throw error;
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching exam:', error);
            toast.error(error?.message || 'Error fetching exam');
        }
    };

    useEffect(() => {
        fetchExam();
    }, [examId]);

    const beginExam = async (challenge: Challenge) => {
        try {
            setBeginLoading(true);
            if (!candidate?.token) throw new Error('No token found');
            const { data, error } = await supabase.functions.invoke(FUNCTIONS.UPDATE_ASSESSMENT, {
                body: {
                    exam_id: examId,
                    candidate_id: candidateId,
                    challenge_id: challenge.id,
                },
            });
            if (error) throw error;
            dispatch.assessment.update(data?.[0]);
            setBeginLoading(false);
            navigate(`${ROUTES.CANDIDATE_ASSESSMENT}/${examId}/${candidateId}/${challenge.id}`, {
                state: {
                    challenge,
                    token: candidate?.token,
                },
            });
        } catch (error) {
            setBeginLoading(false);
            console.error('Error fetching exam:', error);
            toast.error(error?.message || 'Error fetching exam');
        }
    };

    const expiry = (jwt_decode(candidate?.token) as { exp: number })?.exp;
    const now = Date.now() / 1000;
    const timeLeft = Math.round(expiry - now);

    return (
        <Content style={{ padding: '2rem' }}>
            <Title level={2}>Welcome to the Assessment</Title>
            <div className="flex-container justify-between">
                <Title level={4}>Instructions</Title>
                <Timer timeLeft={timeLeft} />
            </div>
            <p>
                Welcome to the coding test for your interview! Please select a challenge from the list below to begin.
                You will have a limited amount of time to complete the challenge, and your progress will be tracked.
                Please do not refresh the page or navigate away from the challenge while you are working on it.
            </p>
            <Divider dashed />
            <Title level={4}>Exams</Title>
            {loading ? (
                <Skeleton />
            ) : (
                <List
                    itemLayout="horizontal"
                    dataSource={challenges}
                    renderItem={(challenge) => (
                        <List.Item>
                            <List.Item.Meta title={challenge.name} description={challenge.short_description} />
                            <Button
                                loading={beginLoading}
                                onClick={() => beginExam(challenge)}
                                className="begin-button"
                                type="primary"
                            >
                                Begin Exam
                            </Button>
                        </List.Item>
                    )}
                />
            )}
        </Content>
    );
};

export default ChallengesListComponent;
