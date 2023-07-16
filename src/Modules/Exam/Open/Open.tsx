import { CopyOutlined, EditFilled, EyeOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Button, Card, Col, Divider, Input, Layout, Modal, Row, Select, Skeleton, Statistic, Switch, Tag, Timeline } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { ExamAPIService } from '../services/Exam.API';
import * as dayjs from 'dayjs'
import { Exam } from '../../../types/Models';
import Title from 'antd/es/typography/Title';
interface CardInterface {
    id: number;
}

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

type ExamQueryResult = Awaited<ReturnType<typeof ExamAPIService.getAll>>;

const Open = () => {

    const [exams, setExams] = useState<ExamQueryResult>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchExams = async () => {
        try {
            const data = await ExamAPIService.getAll();
            console.log(data)
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

    const addExam = () => {
        console.log('click');
    };

    return (
        <div>
            <Input.Search placeholder="search your assessments..." style={{ width: '20%', padding: '5px' }} />
            <Button
                type="primary"
                icon={<PlusCircleFilled />}
                style={{ float: 'right', padding: '5px' }}
                onClick={addExam}
            >
                New Exam
            </Button>
            <div>
                {loading ? <Skeleton /> :
                    <Row gutter={[16, 16]} style={{ marginTop: '1rem' }}>
                        {exams.map((exam) => (
                            <Col>
                                <Card
                                    key={exam.id}
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
