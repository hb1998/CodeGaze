import { useEffect, useState } from 'react';
import { CopyOutlined, EditFilled, EyeOutlined, PlusCircleFilled } from '@ant-design/icons';
import * as dayjs from 'dayjs';
import { Button, Card, Col, Divider, Input, Modal, Row, Skeleton, Statistic, Tag } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import { ExamAPIService } from '../services/Exam.api';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { Challenge, Difficulty, difficultyMap } from '../../../types/Models';
import { ChallengeAPIService } from '../../Challenges/services/Challenge.API';

type ExamQueryResult = Awaited<ReturnType<typeof ExamAPIService.getAll>>;

const Open = () => {
    const session = useSelector((state: IRootState) => state.session);
    const [exams, setExams] = useState<ExamQueryResult>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [newExamLoading, setNewExamLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();
    const [challenges, setChallenges] = useState<Challenge[]>([]);

    const handleOpenModal = () => {
        setModalVisible(true);
    };
    const handleCloseModal = () => {
        setModalVisible(false);
    };

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
    const fetchExams = async () => {
        try {
            const data = await ExamAPIService.getAll();
            console.log(setExams(data));
            console.log(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching assessments:', error);
        }
    };

    useEffect(() => {
        fetchExams();
    }, []);

    const addExam = async () => {
        setModalVisible(false);
        setNewExamLoading(true);
        try {
            await ExamAPIService.create({
                name: `Technical Assessment ${exams.length + 1}`,
                created_by: session?.user?.email || '',
            });
            await fetchExams();
        } catch (error) {
            setNewExamLoading(false);
            console.error('Error fetching assessments:', error);
        }
        setNewExamLoading(false);
    };

    const handleDuplicate = async (examId) => {
        const existingExam = exams.find((exam) => exam.id === examId);
        if (existingExam) {
            setNewExamLoading(true);
            try {
                const newExam = {
                    name: existingExam.name,
                    created_by: session.user.email,
                };
                console.log(newExam, existingExam);
                await ExamAPIService.create(newExam);
                await fetchExams();
            } catch (error) {
                console.error('Error duplicating assessment:', error);
            } finally {
                setNewExamLoading(true);
            }
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchQuery(value);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
    };

    // const handleEdit = (examId) => {
    //     navigate(`/assessments/${examId}/edit`);
    // };

    const handleOpenCard = (examId) => {
        navigate(`/assessments/open/openAssessment/${examId}`);
    };
    return (
        <div>
            <Input.Search
                allowClear
                enterButton="Search"
                value={searchQuery}
                onChange={handleSearch}
                onSearch={handleClearSearch}
                placeholder="search your assessments..."
                style={{ width: '20%', padding: '5px' }}
            />
            <Button
                type="primary"
                icon={<PlusCircleFilled />}
                style={{ float: 'right', padding: '5px' }}
                loading={newExamLoading}
                onClick={handleOpenModal}
            >
                New Exam
            </Button>
            <Modal
                title="Confirmation"
                visible={modalVisible}
                onCancel={handleCloseModal}
                onOk={addExam}
                okText="Confirm"
                cancelText="Cancel"
            >
                <p>Are you sure you want to create a new exam?</p>
            </Modal>
            <div>
                {loading ? (
                    <Skeleton />
                ) : (
                    <Row gutter={[16, 16]} style={{ marginTop: '1rem' }}>
                        {exams
                            .filter((exam) => exam.name.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((exam, index) => (
                                <Col key={`${exam.id}-${index}`}>
                                    <Card
                                        bodyStyle={{alignItems: 'center' }}
                                        title={
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Link to={`/assessments/open/openAssessment/${exam.id}`}>
                                                    <Title onClick={handleOpenCard} level={4}>
                                                        {exam.name}
                                                    </Title>
                                                </Link>
                                                {/* <Link to={`/assessments/open/openAssessment/${exam.id}`}>
                                                    <Button
                                                        onClick={() => handleEdit(exam.id)}
                                                        icon={<EditFilled />}
                                                    ></Button>
                                                </Link> */}
                                            </div>
                                        }
                                        bordered={true}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <div style={{ display: 'flex' }}></div>
                                        <Row gutter={10}>
                                            <Col span={6}>
                                                <Statistic title="Qualifying" value={70} suffix="%" />
                                            </Col>
                                            <Col span={6}>
                                                <Statistic title="Challenges" value={exam.challenge[0]?.count} />
                                            </Col>
                                            {/* <Col span={12}>
                                    <Timeline>
                                        <Timeline.Item>Invited</Timeline.Item>
                                        <Timeline.Item>Assessed</Timeline.Item>
                                        <Timeline.Item>Qualified</Timeline.Item>
                                    </Timeline>
                                </Col> */}
                                        </Row>
                                        <Divider></Divider>
                                        <Row className='actions-container' >
                                            <Col>
                                                <Button type="dashed">Copy Invite Link</Button>
                                                {/* <Link to={`/open/${exam.id}`} state={exam}>
                                                        <Button type="link" icon={<EyeOutlined />}>
                                                            Preview
                                                        </Button>
                                                    </Link> */}
                                                <Button
                                                    onClick={() => handleDuplicate(exam.id)}
                                                    type="link"
                                                    icon={<CopyOutlined />}
                                                >
                                                    Duplicate
                                                </Button>
                                            </Col>
                                            <Col style={{ display: 'flex', alignItems: 'center' }}>
                                                <Tag>{exam.created_by}</Tag> | {dayjs(exam.created_at).format('MMM DD YYYY')}
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            ))}
                    </Row>
                )}
            </div>
            <Content>
                <Outlet />
            </Content>
        </div>
    );
};

export default Open;
