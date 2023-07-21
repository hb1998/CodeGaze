import { useState, useEffect, ChangeEvent, useMemo } from 'react';
import { Card, Col, Row, Space, Statistic, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import Search from 'antd/es/input/Search';
import { CandidateAssessmentAPIService } from '../CandidateAssessment/services/CandidateAssessment.API';
import { Status } from '../../types/Models';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/Route.constants';

const AssessmentColumnDef = [
    {
        title: 'Name',
        dataIndex: ['candidate', 'name'],
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: ['candidate', 'emailId'],
        key: 'email',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status: Status) => Status[status],
    },
    {
        title: 'Joined',
        dataIndex: 'created_at',
        key: 'joined',
        render: (date: string) => dayjs(date).format('h:mm A MMM DD, YYYY'),
    },
    {
        title: 'Language',
        dataIndex: 'language',
        key: 'language',
    },
    {
        title: 'Exam',
        dataIndex: ['exam', 'name'],
        key: 'exam',
        render: (text: string, record: AssessmentQueryResult[number]) => <Link to={`${ROUTES.EXAM}/open/openAssessment/${record?.id}`} >{text}</Link>,
    },
    {
        title: 'Challenge',
        dataIndex: ['challenge', 'name'],
        key: 'challenge',
        render: (text: string, record) => <Link to={`${ROUTES.CHALLENGES}/${record.challenge?.id}`} >{text}</Link>,
    },
];

type AssessmentQueryResult = Awaited<ReturnType<typeof CandidateAssessmentAPIService.getAll>>;

const Dashboard = () => {
    const [assessments, setAssessments] = useState<AssessmentQueryResult>([]);
    const [search, setsearch] = useState('');
    const [loading, setLoading] = useState<boolean>(true);
    const fetchAssessments = async () => {
        try {
            const data = await CandidateAssessmentAPIService.getAll();
            setAssessments(data);
        } catch (error) {
            console.error('Error fetching assessments:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssessments();
    }, []);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setsearch(value);
    };

    const filteredChallenges = useMemo(() => {
        return assessments.filter((challenge) => {
            return challenge.candidate?.name?.toLowerCase?.().includes(search.toLowerCase());
        });
    }, [assessments, search]);

    return (
        <div className="container">
            <Title level={2}>Dashboard</Title>
            <Space size={24} direction="vertical" style={{ width: '100%' }}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Card>
                            <Statistic title="Total Invited" value={assessments.length} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic title="Total Assessed" value={assessments.length} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic title="Total Qualified" value={assessments.length} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic title="Total Challenges" value={assessments.length} />
                        </Card>
                    </Col>
                </Row>
                <div>
                    <Search
                        placeholder="Search Candidate"
                        style={{ width: 200, marginBottom: '10px' }}
                        onChange={handleSearch}
                    />
                    <Table
                        rowKey="id"
                        dataSource={filteredChallenges}
                        columns={AssessmentColumnDef}
                        size="small"
                        loading={loading}
                    />
                </div>
            </Space>
        </div>
    );
};

export default Dashboard;
