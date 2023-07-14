import { CopyOutlined, EditFilled, EyeOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Button, Card, Col, Divider, Input, Layout, Modal, Row, Select, Statistic, Switch, Timeline } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { ExamAPIService } from '../services/Exam.API';
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
const Open = () => {
    const handleCardClick = () => {
        const newCard: CardInterface = {
            id: Date.now(), // Generate a unique identifier for each card
            // Other card data
        };

        setCards((prevCards) => [...prevCards, newCard]);
    };
    const username = 'John Doe';
    const date = 'July 15, 2023';
    const [cards, setCards] = useState<CardInterface[]>([]);

    const [assessments, setAssessments] = useState<IAssessments[]>([]);
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
        <div>
            <Input.Search placeholder="search your assessments..." style={{ width: '20%', padding: '5px' }} />
            <Button
                type="primary"
                icon={<PlusCircleFilled />}
                style={{ float: 'right', padding: '5px' }}
                onClick={handleCardClick}
            >
                New Assessment
            </Button>
            <div>
                <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                    {cards.map((card) => (
                        <Col span={12} key={card.id}>
                            {assessments.map((assessments) => (
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
                                                <h4>{assessments.name}</h4>
                                            </Link>
                                            <Link to={`/assessments/${card.id}/edit`}>
                                                <Button style={{ marginLeft: 200 }} icon={<EditFilled />}></Button>
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
                                    <Row>
                                        <Content style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
                                            <Statistic
                                                style={{ width: '30%', padding: '15px', fontSize: '3.5vw' }}
                                                title="Qualifying"
                                                value={70}
                                                suffix="%"
                                            />
                                            <div
                                                style={{
                                                    width: '50%',

                                                    // fontSize: '3.5vw',
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                                <div style={{ width: '25%' }}>
                                                    <Statistic title="challenges" value={0} />
                                                    <Statistic title="projects" value={0} />
                                                </div>
                                                <div>
                                                    <Statistic title="Multiple choice" value={0} />
                                                    <Statistic title="Open ended" value={0} />
                                                </div>
                                            </div>
                                            <Timeline style={{ width: '20%', padding: '8px' }}>
                                                <Timeline.Item>Invited</Timeline.Item>
                                                <Timeline.Item>Assessed</Timeline.Item>
                                                <Timeline.Item>Qualified</Timeline.Item>
                                            </Timeline>
                                        </Content>
                                    </Row>
                                    <Divider></Divider>
                                    <div style={{ display: 'flex' }}>
                                        <Row
                                            style={{
                                                width: '100%',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <Button type="link">Copy Invite Link</Button>
                                            <Button type="link" icon={<EyeOutlined />}>
                                                Preview
                                            </Button>
                                            <Button type="link" icon={<CopyOutlined />}>
                                                Duplicate
                                            </Button>
                                            <div>
                                                {username} | {date}
                                            </div>
                                        </Row>
                                    </div>
                                </Card>
                            ))}
                        </Col>
                    ))}
                </Row>
            </div>
            <Content>
                <Outlet />
            </Content>
        </div>
    );
};

export default Open;
