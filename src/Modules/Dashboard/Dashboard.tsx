import { useState, useEffect, ChangeEvent, useMemo } from 'react';
import { Button, Card, Col, Row, Space, Statistic, Table, Tag } from 'antd';
import Title from 'antd/es/typography/Title';
import Search from 'antd/es/input/Search';
import { CandidateAssessmentAPIService } from '../CandidateAssessment/services/CandidateAssessment.API';
import { Status } from '../../types/Models';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/Route.constants';
import { ColumnsType } from 'antd/es/table';
import { StatusColDef } from '../Candidate/CandidateColumn';

const qualifyingScore = 50;

const AssessmentColumnDef: ColumnsType<AssessmentQueryResult[number]> = [
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
        title: 'Result',
        dataIndex: 'result',
        key: 'result',
        render: (result) => {
            if (result) {
                const correctTestCases = result.reduce((acc, curr) => (curr ? acc + 1 : acc), 0) / result.length;
                const percentageOfCorrectTestCases = Math.round(correctTestCases * 100);

                return percentageOfCorrectTestCases ? (
                    <Tag color={percentageOfCorrectTestCases > qualifyingScore ? 'green' : 'red'}>
                        {percentageOfCorrectTestCases}%
                    </Tag>
                ) : null;
            }
            return null;
        },
    },
    StatusColDef('status'),
    {
        title: 'Joined',
        dataIndex: 'created_at',
        key: 'joined',
        render: (date: string) => dayjs(date).format('h:mm A MMM DD, YYYY'),
        sorter: (a, b) => dayjs(a.created_at).unix() - dayjs(b.created_at).unix(),
        defaultSortOrder: 'descend',
    },
    {
        title: 'Time taken',
        key: 'timeTaken',
        render: (date: string, record) => {
            const timeTaken = dayjs(`${record.finished}+00:00`).diff(dayjs(record.created_at), 'minute');
            return isNaN(timeTaken) ? 'In Process' : `${timeTaken} minutes`;
        },
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
        render: (text: string, record: AssessmentQueryResult[number]) =>
            // <Link to={`${ROUTES.EXAM}/open/openAssessment/${record?.exam?.id}`} state={{ exam: record?.exam }}>
            text,
        // </Link>
    },
    {
        title: 'Challenge',
        dataIndex: ['challenge', 'name'],
        key: 'challenge',
        render: (text: string, record) => <Link to={`${ROUTES.CHALLENGES}/${record.challenge?.id}`}>{text}</Link>,
    },
    {
        title: 'Actions',
        key: 'Action',
        fixed: 'right',
        render: (text: string, record) => (
            <Link to={`${ROUTES.ASSESSMENT_RESULT}/${record.id}`} state={{ assessment: record }}>
                View Report
            </Link>
        ),
    },
];

export type AssessmentQueryResult = Awaited<ReturnType<typeof CandidateAssessmentAPIService.getAll>>;

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
