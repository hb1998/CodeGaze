import { useState, ChangeEvent, useMemo } from 'react';
import { Card, Col, Row, Space, Statistic, Table, Tag } from 'antd';
import Title from 'antd/es/typography/Title';
import Search from 'antd/es/input/Search';
import { CandidateAssessmentAPIService } from '../CandidateAssessment/services/CandidateAssessment.API';
import { Status, difficultyMap } from '../../types/Models';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/Route.constants';
import { ColumnsType } from 'antd/es/table';
import { StatusColDef } from '../Candidate/CandidateColumn';
import CandidateAssessmentUtils from '../CandidateAssessment/services/CanidadateAssessment.utils';
import { QUALIFYING_SCORE } from '../../constants/common.constants';
import { useQuery } from '@tanstack/react-query';

const AssessmentColumnDef: (challenges: string[], exams: string[]) => ColumnsType<AssessmentQueryResult[number]> = (
    challenges,
    exams,
) => [
    {
        title: 'Name',
        dataIndex: ['candidate', 'name'],
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: ['candidate', 'emailId'],
        sorter: (a, b) => a.candidate.emailId.localeCompare(b.candidate.emailId),
        key: 'email',
    },
    {
        title: 'Result',
        dataIndex: 'result',
        key: 'result',
        render: (result, record) => {
            if (result) {
                const percentageOfCorrectTestCases = CandidateAssessmentUtils.getScore(record);

                return ![undefined, null].includes(percentageOfCorrectTestCases) ? (
                    <Tag color={percentageOfCorrectTestCases > QUALIFYING_SCORE ? 'green' : 'red'}>
                        {percentageOfCorrectTestCases}%
                    </Tag>
                ) : null;
            }
            return null;
        },
        sorter: (a, b) => CandidateAssessmentUtils.getScore(a) - CandidateAssessmentUtils.getScore(b),
    },
    {
        title: 'Execution Time (s)',
        dataIndex: 'execution_time',
        key: 'execution_time',
        sorter: (a, b) => a.execution_time - b.execution_time,
        render: (time) => time || 'NA',
    },
    {
        title: 'Difficulty',
        dataIndex: 'difficulty',
        key: 'difficulty',
        render: (data, record) => difficultyMap[record.challenge?.difficulty],
        filters: Object.keys(difficultyMap).map((key) => ({
            text: difficultyMap[key],
            value: key,
        })),
        onFilter: (value, record) => {
            return record.challenge?.difficulty == +value;
        },
    },
    {
        title: 'Execution Memory (MB)',
        dataIndex: 'execution_memory',
        key: 'execution_memory',
        sorter: (a, b) => a.execution_memory - b.execution_memory,
        render: (memory: number) => memory / 1024 || 'NA',
    },
    {
        title: 'Joined',
        dataIndex: 'created_at',
        key: 'joined',
        render: (date: string) => dayjs(date).format('h:mm A MMM DD, YYYY'),
        sorter: (a, b) => dayjs(a.created_at).unix() - dayjs(b.created_at).unix(),
        defaultSortOrder: 'descend',
    },
    StatusColDef('status'),
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
        dataIndex: 'exam',
        key: 'exam',
        render: (data, record) => record.exam.name,
        filters: exams.map((exam) => ({
            text: exam,
            value: exam,
        })),
        onFilter: (value, record) => {
            return record.exam.name == value;
        },
    },
    {
        title: 'Challenge',
        dataIndex: ['challenge', 'name'],
        key: 'challenge',
        filters: challenges.map((challenge) => ({
            text: challenge,
            value: challenge,
        })),
        onFilter: (value, record) => {
            return record.challenge.name == value;
        },
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
    const [search, setsearch] = useState('');
    const { data: assessments, isFetching: isLoading } = useQuery({
        queryKey: ['assessments'],
        queryFn: CandidateAssessmentAPIService.getAll,
        initialData: [],
    });

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setsearch(value);
    };

    const fitleredAssessments = useMemo(() => {
        return assessments.filter(
            (challenge) => challenge.candidate?.name?.toLowerCase?.().includes(search.toLowerCase()),
        );
    }, [assessments, search]);

    const { qualified, totalCompleted, uniqueChallenges, uniqueExams } = useMemo(
        () => getAssessmentsMetadata(assessments),
        [assessments],
    );

    return (
        <div className="container">
            <Title level={2}>Dashboard</Title>
            <Space size={24} direction="vertical" style={{ width: '100%' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card>
                            <Statistic loading={isLoading} title="Total Invited" value={assessments.length} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic loading={isLoading} title="Total Completed" value={totalCompleted} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic loading={isLoading} title="Total Qualified" value={qualified} />
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
                        dataSource={fitleredAssessments}
                        columns={AssessmentColumnDef([...uniqueChallenges], [...uniqueExams])}
                        size="small"
                        pagination={false}
                        loading={isLoading}
                    />
                </div>
            </Space>
        </div>
    );
};

const getAssessmentsMetadata = (assessments: AssessmentQueryResult) => {
    return assessments.reduce(
        (acc, assessment) => {
            const percentageOfCorrectTestCases = CandidateAssessmentUtils.getScore(assessment);
            if (percentageOfCorrectTestCases > QUALIFYING_SCORE) {
                acc.qualified += 1;
            }
            if (assessment.status === Status.SUBMITTED) {
                acc.totalCompleted += 1;
            }

            assessment.challenge?.name && acc.uniqueChallenges.add(assessment.challenge.name);
            assessment.exam?.name && acc.uniqueExams.add(assessment.exam.name);

            return acc;
        },
        {
            qualified: 0,
            totalCompleted: 0,
            uniqueChallenges: new Set<string>(),
            uniqueExams: new Set<string>(),
        },
    );
};

export default Dashboard;
