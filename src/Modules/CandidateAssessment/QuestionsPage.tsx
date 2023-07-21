import { Button, Divider, List, Skeleton, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ExamAPIService } from '../Exam/services/Exam.API';
import { Challenge } from '../../types/Models';
import { ROUTES } from '../../constants/Route.constants';
import './styles/Assessment.css';
const { Title } = Typography

const ChallengesListComponent = () => {
    const { examId, candidateId } = useParams();
    const { state } = useLocation();
    const [loading, setLoading] = useState(true)
    const [challenges, setchallenges] = useState<Challenge[]>([])

    useEffect(() => {
        ExamAPIService.getById(examId).then((exam) => {
            const challenges = exam.challenge;
            setLoading(false);
            setchallenges(challenges);
        });
    }, [examId])


    return (
        <Content style={{ padding: '2rem' }}>
            <Title level={2}>Welcome to the Assessment</Title>
            <Title level={4}>Instructions</Title>
            <p>
                Welcome to the coding test for your interview! Please select a challenge from the list below to begin. You will have a
                limited amount of time to complete the challenge, and your progress will be tracked. Please do not refresh the page or
                navigate away from the challenge while you are working on it.
            </p>
            <Divider dashed />
            <Title level={4}>Exams</Title>
            {loading ? <Skeleton /> : <List
                itemLayout="horizontal"
                dataSource={challenges}
                renderItem={(challenge) => (
                    <List.Item>
                        <List.Item.Meta title={challenge.name} description={challenge.short_description} />
                        <Link to={`${ROUTES.CANDIDATE_ASSESSMENT}/${examId}/${candidateId}/${challenge.id}`} state={challenge} >
                            <Button className='begin-button' type="primary">Begin Exam</Button>
                        </Link>
                    </List.Item>
                )}
            />}
        </Content>
    );
};

export default ChallengesListComponent;