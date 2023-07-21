import { useEffect, useState } from 'react';
import { Button, Layout, Card, Divider, Col, Row, Tag, Input } from 'antd';
import { Typography } from 'antd';
import { ChallengeAPIService } from '../../Challenges/services/Challenge.API';
import { DeleteFilled,  PlusSquareFilled, SelectOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Challenge, Difficulty, difficultyMap } from '../../../types/Models';
import CommonUtils from '../../common/utils/Common.utils';

const { Content } = Layout;
const { Title } = Typography;

export interface IAssessments {
  name: string | null;
  candidate_id: number | null;
  code: string | null;
  created_at: string | null;
  created_by: string | null;
  exam_id: number | null;
  id: number;
  joined: string | null;
  status: number | null;
  language: number | null;
}

type ChallengeResult = Awaited<ReturnType<typeof ChallengeAPIService.getAll>>;

const ChallengesAssessment = ({ onChange }) => {
  const [challenges, setChallenges] = useState<ChallengeResult>([]);
  const [selectedChallenges, setSelectedChallenges] = useState<ChallengeResult>([]);
//   const [selectedChallengeName, setSelectedChallengeName] = useState('');

  const fetchChallenges = async () => {
    try {
      const data = await ChallengeAPIService.getAll();
      setChallenges(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  const handleAddChallenge = (selectedChallenge: ChallengeResult[number]) => {
    setSelectedChallenges((prevChallenges) => [...prevChallenges, selectedChallenge]);
    setChallenges((prevChallenges) => prevChallenges.filter((challenge) => challenge.id !== selectedChallenge.id));
  };

  const handleDeleteChallenge = (challengeId: number) => {
    setSelectedChallenges((prevChallenges) =>
      prevChallenges.filter((challenge) => challenge.id !== challengeId)
    );
  };

  const handleChallengeNameChange = (challengeId: number, newName: string) => {
    setSelectedChallenges((prevChallenges) =>
      prevChallenges.map((challenge) => {
        if (challenge.id === challengeId) {
          return { ...challenge, name: newName };
        }
        return challenge;
      })
    );
  };

  return (
    <div style={{ width: '100%' }}>
      <Layout style={{ display: 'flex', flexDirection: 'row' }}>
        <Content style={{ flex: 1 }}>
          <Title level={4}>Challenge library</Title>
          <Row gutter={[16, 16]}>
            {challenges.map((challenge) => (
              <Col span={24} key={challenge.id}>
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
                      <Button
                        onClick={() => handleAddChallenge(challenge)}
                        type="primary"
                        icon={<PlusSquareFilled />}
                      ></Button>
                    </div>
                  </div>

                  <Content>
                    <p>{challenge.short_description}</p>
                  </Content>
                </Card>
              </Col>
            ))}
          </Row>
        </Content>

        <Content style={{ padding: '14px', flex: 1 }}>
          <Title level={4}>Selected Challenges</Title>
          {selectedChallenges.map((selectedChallenge) => (
            <Card style={{ width: '100%' }} key={selectedChallenge.id}>
              <div
                style={{
                    width:'100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Input
                style={{border:'none', outline:'none', width:'70%'}}
                  value={selectedChallenge.name}
                  onChange={(e) => handleChallengeNameChange(selectedChallenge.id, e.target.value)}
                />
                <div>
                    <Link to={`/challenges/${challenges}`} state={challenges} >
                  <Button type="link" icon={<SelectOutlined />}>
                    Preview
                  </Button>
                  </Link>
                  <Button icon={<DeleteFilled />} onClick={() => handleDeleteChallenge(selectedChallenge.id)}></Button>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                <p>
                  difficulty: {selectedChallenge.difficulty} | est: 30min | Language: javascript
                </p>
                <p> </p>
              </div>
              <Divider></Divider>
              <Button>Custom challenge</Button>
            </Card>
          ))}

          {selectedChallenges.length === 0 ? (
            <p>No challenges added to this assessment</p>
          ) : null}
        </Content>
      </Layout>
    </div>
  );
};

export default ChallengesAssessment;
