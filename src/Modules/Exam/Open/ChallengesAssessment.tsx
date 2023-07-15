import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Layout, Select, theme, Card, Tabs, Divider } from 'antd';
import { Typography } from 'antd';
import { ExamAPIService } from '../services/Exam.API';
import { ChallengeAPIService } from '../../Challenges/services/Challenge.API';
import { DeleteFilled, EyeOutlined, PlusSquareFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

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

const ChallengesAssessment = ({ isEditMode = false }) => {
    // const {
    //     token: { colorBgContainer },
    // } = theme.useToken();

    //     const [form] = Form.useForm();
    //     const [showForm, setShowForm] = useState(false);

    //     const handleSubmit = (values) => {
    //         console.log(values); // Handle form submission logic here
    //     };

    //     const handleButtonClick = () => {
    //     setShowForm(true);
    //   };

    interface IChallenges {
        id: string;
        name: string;
        language: string;
        difficulty: string;
        description: string;
    }

    const [challenges, setChallenges] = useState<IChallenges[]>([]);

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

    const [assessments, setAssessments] = useState<IAssessments[]>([]);
    const [selectedChallenges, setSelectedChallenges] = useState<IChallenges[]>([]);

    const handleAddChallenge = (selectedChallenge: IChallenges) => {
        setSelectedChallenges((prevChallenges) => [...prevChallenges, selectedChallenge]);
    };

    const handleDeleteChallenge = (challengeId: string) => {
        setSelectedChallenges((prevChallenges) => prevChallenges.filter((challenge) => challenge.id !== challengeId));
    };

    // Fetch assessments when the component mounts
    const fetchAssessments = async () => {
        try {
            const data = await ExamAPIService.getAll();
            setAssessments(data);
            console.log(data, 'api');
        } catch (error) {
            console.error('Error fetching assessments:', error);
        }
    };

    useEffect(() => {
        fetchAssessments();
    }, []);

    return (
        <div style={{ width: '100%' }}>
            <Layout style={{ display: 'flex', flexDirection: 'row' }}>
                <Content style={{ padding: '14px', flex: 1 }}>
                    <Title level={4}>Challenge library {isEditMode ? 'Editable' : ''}</Title>
                    {challenges.map((challenges) => (
                        <Card
                            style={{
                                width: '100%',
                            }}
                            key={challenges.id}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Title level={4}> {challenges.name}</Title>
                                <p>difficulty: {challenges.difficulty}</p>
                                <div>
                                    <Link to={'/'}>
                                        {' '}
                                        <Button type="link" icon={<EyeOutlined />}>
                                            Preview
                                        </Button>
                                    </Link>
                                    <Button
                                        onClick={() => handleAddChallenge(challenges)}
                                        type="primary"
                                        icon={<PlusSquareFilled />}
                                    ></Button>
                                </div>
                            </div>

                            <Content>
                                <p>
                                    {/* <p>{challenges.description}</p> */}
                                    The task requires you to develop a program that will settle the bills among users to
                                    splitwise app
                                </p>
                            </Content>
                            <Divider></Divider>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <p>Language: {challenges.language}</p>
                                <Button>Custom challenge</Button>
                            </div>
                        </Card>
                    ))}
                </Content>

                <Content style={{ padding: '14px', flex: 1 }}>
                    <Title level={4}>Selected Challenges</Title>
                    {selectedChallenges.map((selectedChallenges) => (
                        <Card
                            style={{
                                width: '100%',
                            }}
                            key={selectedChallenges.id}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    // backgroundColor:"red"
                                }}
                            >
                                <h1>{selectedChallenges.name}</h1>

                                <div>
                                    <Button type="link" icon={<EyeOutlined />}>
                                        Preview
                                    </Button>
                                    <Button
                                        icon={<DeleteFilled />}
                                        onClick={() => handleDeleteChallenge(selectedChallenges.id)}
                                    ></Button>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <p>
                                    difficulty: {selectedChallenges.difficulty} | est: 30min | Language:
                                    {selectedChallenges.language}{' '}
                                </p>
                                <p> </p>
                            </div>
                            <Divider></Divider>

                            <Button>Custom challenge</Button>
                        </Card>
                    ))}

                    {selectedChallenges.length === 0 ?? <p>No challenges added to this assessment</p>}
                </Content>
            </Layout>
        </div>
    );
};

export default ChallengesAssessment;
