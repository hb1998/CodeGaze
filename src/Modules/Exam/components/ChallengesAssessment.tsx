import { Layout, Col, Row } from 'antd';
import { Typography } from 'antd';
import ExamCard from './ExamCard';
import { ChallengeResult } from '../ExamDetail';

const { Title } = Typography;

const ChallengesAssessment = ({
    challenges,
    addChallenge,
    selectedChallenges,
    deleteChallenge,
}: {
    challenges: ChallengeResult;
    addChallenge: (challenges: ChallengeResult[number]) => void;
    selectedChallenges: ChallengeResult;
    deleteChallenge: (challenges: ChallengeResult[number]) => void;
}) => {
    const handleAddChallenge = (selectedChallenge: ChallengeResult[number]) => {
        addChallenge(selectedChallenge);
    };

    return (
        <Layout style={{ display: 'flex', flexDirection: 'row' }}>
            <Row style={{ width: '100%' }} gutter={24}>
                <Col span={12}>
                    <Title level={4}>Challenge library</Title>
                    <Row gutter={[16, 16]}>
                        {challenges.map((challenge) => (
                            <Col span={24} key={challenge.id}>
                                <ExamCard challenge={challenge} handleAddChallenge={handleAddChallenge} />
                            </Col>
                        ))}
                    </Row>
                </Col>

                <Col span={12}>
                    <Title level={4}>Selected Challenges</Title>
                    <Row gutter={[16, 16]}>
                        {selectedChallenges.map((challenge) => (
                            <ExamCard challenge={challenge} handleDeleteChallenge={deleteChallenge} />
                        ))}
                    </Row>

                    {selectedChallenges.length === 0 ? <p>No challenges added to this assessment</p> : null}
                </Col>
            </Row>
        </Layout>
    );
};

export default ChallengesAssessment;
