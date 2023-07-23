import { SelectOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Tag, Button, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Link } from 'react-router-dom';
import { Difficulty, difficultyMap } from '../../../types/Models';
import CommonUtils from '../../common/utils/Common.utils';
import { ChallengeAPIService } from '../../Challenges/services/Challenge.API';
const { Title } = Typography;

type ChallengeResult = Awaited<ReturnType<typeof ChallengeAPIService.getAll>>;

const ExamCard = ({
    challenge,
    handleAddChallenge,
    handleDeleteChallenge,
}: {
    challenge: ChallengeResult[number];
    handleAddChallenge?: (challenge: ChallengeResult[number]) => void;
    handleDeleteChallenge?: (challenge: ChallengeResult[number]) => void;
}) => {
    return (
        <Card bodyStyle={{ padding: '10px' }} style={{ width: '100%' }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Title style={{ marginTop: 5, marginRight: 12 }} level={5}>
                        {challenge.name}
                    </Title>
                    <Tag color={CommonUtils.getColor(challenge.difficulty as unknown as Difficulty)}>
                        {difficultyMap[challenge.difficulty]}
                    </Tag>
                </div>
                <div>
                    <Link to={`/challenges/${challenge.id}`} state={challenge}>
                        <Button type="link" icon={<SelectOutlined />}>
                            Preview
                        </Button>
                    </Link>
                    {handleAddChallenge ? (
                        <Button
                            onClick={() => handleAddChallenge(challenge)}
                            type="primary"
                            icon={<PlusOutlined />}
                        ></Button>
                    ) : (
                        <Button
                            onClick={() => handleDeleteChallenge(challenge)}
                            type="primary"
                            icon={<DeleteOutlined />}
                        ></Button>
                    )}
                </div>
            </div>

            <Content>
                <p>{challenge.short_description}</p>
            </Content>
        </Card>
    );
};

export default ExamCard;
