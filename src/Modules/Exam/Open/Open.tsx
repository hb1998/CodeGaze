import { useEffect, useState } from 'react';
import { CopyOutlined, EditFilled, EyeOutlined, PlusCircleFilled } from '@ant-design/icons';
import * as dayjs from 'dayjs'
import { Button, Card, Col, Divider, Input, Row, Skeleton, Statistic, Tag } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import { ExamAPIService } from '../services/Exam.api';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../store';

type ExamQueryResult = Awaited<ReturnType<typeof ExamAPIService.getAll>>;

const Open = () => {

    const session = useSelector((state: IRootState) => state.session);
    const [exams, setExams] = useState<ExamQueryResult>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [newExamLoading, setNewExamLoading] = useState<boolean>(false);

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

    return (
        <div>
            <Input.Search placeholder="search your assessments..." style={{ width: '20%', padding: '5px' }} />
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
                {loading ? <Skeleton /> :
                    <Row gutter={[16, 16]} style={{ marginTop: '1rem' }}>
                        {exams.map((exam) => (
                            <Col
                                key={exam.id}
                            >
                                <Card
                                    title={
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {/* <Link to={`/assessments/${card.id}/view`}> */}
                                            <Link to={`/assessments/open/openAssessment`}>
                                                <Title level={4}>{exam.name}</Title>
                                            </Link>
                                            <Link to={`/assessments/${exam.id}/edit`}>
                                                <Button icon={<EditFilled />}></Button>
                                            </Link>
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
                                            <Statistic
                                                title="Qualifying"
                                                value={70}
                                                suffix="%"
                                            />
                                        </Col>
                                        <Col span={6}>
                                            <Statistic
                                                title="Challenges" value={exam.challenge[0]?.count} />
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
                                    <div style={{ display: 'flex' }}>
                                        <Row>
                                            <Col className='actions-container'  >
                                                <Button type="dashed">Copy Invite Link</Button>
                                                <Button type="link" icon={<EyeOutlined />}>
                                                    Preview
                                                </Button>
                                                <Button type="link" icon={<CopyOutlined />}>
                                                    Duplicate
                                                </Button>
                                            </Col>
                                            <Col style={{ display: 'flex', alignItems: 'center' }} >
                                                <Tag>{exam.created_by}</Tag> | {dayjs(exam.created_at).format('MMM DD YYYY')}
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>}
            </div>
            <Content>
                <Outlet />
            </Content>
        </div>
    );
};

export default Open;
