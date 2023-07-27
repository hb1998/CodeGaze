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
import CandidateAssessmentUtils from '../CandidateAssessment/services/CanidadateAssessment.utils';
import { QUALIFYING_SCORE } from '../../constants/common.constants';
import { supabase } from '../API/supabase';

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
        render: (result, record) => {
            if (result) {
                const percentageOfCorrectTestCases = CandidateAssessmentUtils.getScore(record);

                return percentageOfCorrectTestCases ? (
                    <Tag color={percentageOfCorrectTestCases > QUALIFYING_SCORE ? 'green' : 'red'}>
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
        render: (date: string, record) => CandidateAssessmentUtils.getTimeTaken(record),
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

    const qualified = assessments.filter((assessment) => {
        const percentageOfCorrectTestCases = CandidateAssessmentUtils.getScore(assessment);
        return percentageOfCorrectTestCases > QUALIFYING_SCORE;
    });

    const totalCompleted = assessments.filter((assessment) => assessment.status === Status.SUBMITTED);

    return (
        <div className="container">
            <Title level={2}>Dashboard</Title>
            <Space size={24} direction="vertical" style={{ width: '100%' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card>
                            <Statistic title="Total Invited" value={assessments.length} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic title="Total Completed" value={totalCompleted.length} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic title="Total Qualified" value={qualified.length} />
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
