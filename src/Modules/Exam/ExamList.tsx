import { useEffect, useState } from 'react';
import { CopyOutlined, PlusCircleFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Button, Card, Col, Divider, Input, Row, Skeleton, Statistic, Tag, Typography, Space, Form, Modal } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet, useNavigate } from 'react-router';
import Title from 'antd/es/typography/Title';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { ExamAPIService } from './services/Exam.API';
import { supabase } from '../API/supabase';
import { toast } from 'react-toastify';
import { ROUTES } from '../../constants/Route.constants';
import { Candidate, CandidateInsertDto } from '../../types/Models';
import { FunctionsHttpError } from '@supabase/supabase-js';
import { FUNCTIONS } from '../../constants/functions.constants';

const { Text } = Typography;

interface FormValues {
    name: string;
    email: string;
}

export type ExamQueryResult = Awaited<ReturnType<typeof ExamAPIService.getAll>>;

const ExamList = () => {
    const session = useSelector((state: IRootState) => state.session);
    const [exams, setExams] = useState<ExamQueryResult>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [newExamLoading, setNewExamLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [inviteLink, setInviteLink] = useState('');
    const [examId, setExamId] = useState('');
    const [form] = Form.useForm();

    const navigate = useNavigate();

    const fetchExams = async () => {
        try {
            const data = await ExamAPIService.getAll();
            setExams(data);
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
        setNewExamLoading(true);
        try {
            const exam = await ExamAPIService.create({
                name: `Technical Assessment ${exams.length + 1}`,
                created_by: session?.user?.email || '',
            });
            await fetchExams();
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

    const copyInviteLink = (examId) => {
        const domain = window.location.origin;
        navigator.clipboard.writeText(`${domain}${ROUTES.CANDIDATE_ASSESSMENT}/${examId}`);
        toast.success('Link copied to clipboard');
    };

    const copyCandidateInviteLink = () => {
        navigator.clipboard.writeText(inviteLink);
        toast.success('Candidate Invite Link copied to clipboard');
    };

    const openGenerateLinkPopup = (examId) => {
        setModalVisible(true);
        setExamId(examId);
    };

    const onSubmit = (values: FormValues) => {
        setModalLoading(true);
        const userData = {
            emailId: values.email,
            name: values.name,
        };
        createCandidate(userData)
            .then((candidateData: Candidate) => {
                setModalLoading(false);
                const domain = window.location.origin;
                const link = `${domain}${ROUTES.CANDIDATE_ASSESSMENT}/${examId}/${candidateData.id}`;
                setInviteLink(link);
            })
            .catch((error) => {
                setModalLoading(false);
                console.error('Error creating user:', error);
                toast.error(error.message ?? 'Error creating user');
            });
    };

    const createCandidate = async (candidateData: CandidateInsertDto) => {
        const { data, error } = await supabase.functions.invoke<CandidateInsertDto>(FUNCTIONS.CREATE_CANDIDATE, {
            body: candidateData,
        });
        setModalLoading(false);
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
            <Modal
                title="Generate Candidate Invite Link"
                open={modalVisible}
                okText="Invite user"
                onCancel={() => {
                    form.resetFields();
                    setModalVisible(false);
                    setInviteLink('');
                }}
                afterClose={() => {
                    form.resetFields();
                    setInviteLink('');
                }}
                footer={null}
            >
                <Form form={form} onFinish={onSubmit}>
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

                    {inviteLink && (
                        <div style={{ marginBottom: '1rem' }}>
                            <Text code>{inviteLink}</Text>
                            <CopyOutlined onClick={copyCandidateInviteLink} />
                        </div>
                    )}

                    <Form.Item>
                        <Button
                            loading={modalLoading}
                            disabled={modalLoading || !!inviteLink}
                            type="primary"
                            htmlType="submit"
                            style={{ marginRight: '8px' }}
                        >
                            Generate Invite Link
                        </Button>
                        <Button
                            type="default"
                            onClick={() => {
                                form.resetFields();
                                setModalVisible(false);
                            }}
                        >
                            Close
                        </Button>
                    </Form.Item>
                </Form>
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
                                            <Space>
                                                <Button onClick={() => copyInviteLink(exam.id)} type="dashed">
                                                    Copy Invite Link
                                                </Button>
                                                <Button onClick={() => openGenerateLinkPopup(exam.id)} type="link">
                                                    Generate Link
                                                </Button>
                                                {/* <Button
                                                    onClick={() => handleDuplicate(exam.id)}
                                                    type="link"
                                                    icon={<CopyOutlined />}
                                                >
                                                    Duplicate
                                                </Button> */}
                                            </Space>
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
