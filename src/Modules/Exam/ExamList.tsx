import { useState } from 'react';
import { CopyOutlined, PlusCircleFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Button, Card, Col, Divider, Input, Row, Skeleton, Statistic, Tag } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet, useNavigate } from 'react-router';
import Title from 'antd/es/typography/Title';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { ExamAPIService } from './services/Exam.API';
import { toast } from 'react-toastify';
import { ROUTES } from '../../constants/Route.constants';
import { useQuery } from '@tanstack/react-query';

export type ExamQueryResult = Awaited<ReturnType<typeof ExamAPIService.getAll>>;

const ExamList = () => {
    const session = useSelector((state: IRootState) => state.session);
    const [newExamLoading, setNewExamLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const {
        data: exams,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['exams'],
        queryFn: ExamAPIService.getAll,
    });

    const addExam = async () => {
        setNewExamLoading(true);
        try {
            const exam = await ExamAPIService.create({
                name: `Technical Assessment ${exams.length + 1}`,
                created_by: session?.user?.email || '',
            });
            await refetch();
            navigate(`${ROUTES.EXAM_DETAIL}/${exam.id}`, {
                state: {
                    exam,
                },
            });
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
                await ExamAPIService.create(newExam);
                await refetch();
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

    const copyInviteLink = (examId) => {
        const domain = window.location.origin;
        navigator.clipboard.writeText(`${domain}${ROUTES.CANDIDATE_ASSESSMENT}/${examId}`);
        toast.success('Link copied to clipboard');
    };

    const handleOpenCard = (exam: ExamQueryResult[number]) => {
        navigate(`/assessments/open/openAssessment/${exam.id}`, {
            state: {
                exam,
            },
        });
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
                onClick={addExam}
            >
                New Exam
            </Button>
            <div>
                {isLoading ? (
                    <Skeleton />
                ) : (
                    <Row gutter={[16, 16]} style={{ marginTop: '1rem' }}>
                        {exams
                            .filter((exam) => exam.name.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((exam, index) => (
                                <Col key={`${exam.id}-${index}`}>
                                    <Card
                                        bodyStyle={{ alignItems: 'center' }}
                                        title={
                                            <div
                                                onClick={() => handleOpenCard(exam)}
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <Title level={4}>{exam.name}</Title>
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
                                                <Statistic title="Qualifying" value={exam.qualifyingScore} suffix="%" />
                                            </Col>
                                            <Col span={6}>
                                                <Statistic title="Challenges" value={exam.challenge.length} />
                                            </Col>
                                        </Row>
                                        <Divider></Divider>
                                        <Row className="actions-container">
                                            <Col>
                                                <Button onClick={() => copyInviteLink(exam.id)} type="dashed">
                                                    Copy Invite Link
                                                </Button>
                                                <Button
                                                    onClick={() => handleDuplicate(exam.id)}
                                                    type="link"
                                                    icon={<CopyOutlined />}
                                                >
                                                    Duplicate
                                                </Button>
                                            </Col>
                                            <Col style={{ display: 'flex', alignItems: 'center' }}>
                                                <Tag>{exam.created_by}</Tag> |{' '}
                                                {dayjs(exam.created_at).format('MMM DD YYYY')}
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

export default ExamList;
