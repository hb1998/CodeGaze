import React, { useEffect, useState } from 'react';
import { AssessmentQueryResult } from '../Dashboard/Dashboard';
import { Card, Col, Row, Skeleton, Tag } from 'antd';
import CodeMirror from '@uiw/react-codemirror';
import { Language, languagesNameMap } from '../common/CodeEditor/ProgrammingLanguages';
import TestCaseTable from '../common/CodeEditor/TestCaseTable';
import { InputOutput } from '../../types/Models';
import { useLocation, useParams } from 'react-router';
import { CandidateAssessmentAPIService } from './services/CandidateAssessment.API';
import CandidateAssessmentUtils from './services/CanidadateAssessment.utils';
import { QUALIFYING_SCORE } from '../../constants/common.constants';
import dayjs from 'dayjs';

const ReportPage: React.FC = () => {
    const state = useLocation().state;
    const assessmentFromLocation = state?.assessment as AssessmentQueryResult[number];
    const [assessment, setAssessment] = useState(assessmentFromLocation);
    const [loading, setLoading] = useState(true);
    const language = languagesNameMap[assessment?.language] || languagesNameMap[Language.JAVASCRIPT];

    const { assessmentId } = useParams<{ assessmentId: string }>();

    useEffect(() => {
        if (!assessmentFromLocation && assessmentId) {
            CandidateAssessmentAPIService.getById(assessmentId)
                .then((data) => {
                    setAssessment(data);
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [assessmentFromLocation, assessmentId]);

    const score = CandidateAssessmentUtils.getScore(assessment);
    return (
        <div style={{ padding: '24px' }}>
            {loading ? (
                <Skeleton />
            ) : (
                <Row gutter={[16, 16]}>
                    <Col span={6}>
                        <Card>
                            <p>
                                <b>Name:</b> {assessment?.candidate?.name}
                            </p>
                            <p>
                                <b>Email:</b> {assessment?.candidate?.emailId}
                            </p>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <p>
                                <b>Time Taken:</b> {CandidateAssessmentUtils.getTimeTaken(assessment)}
                            </p>
                            <p>
                                <b>Score: </b>
                                <Tag color={score > QUALIFYING_SCORE ? 'green' : 'red'}>{score}%</Tag>
                            </p>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <p>
                                <b>Started:</b> {dayjs(assessment?.joined).format('h:mm A MMM DD, YYYY')}
                            </p>
                            <p>
                                <b>Finished:</b>{' '}
                                {assessment?.finished
                                    ? dayjs(assessment?.finished).format('h:mm A MMM DD, YYYY')
                                    : 'Not Finished'}
                            </p>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <p>
                                <b>Exam:</b> {assessment?.exam?.name}
                            </p>
                            <p>
                                <b>Challenge:</b> {assessment?.challenge?.name}
                            </p>
                        </Card>
                    </Col>

                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Card title="Code">
                                <CodeMirror
                                    value={assessment?.code || ''}
                                    height="calc(100vh - 12rem)"
                                    theme="dark"
                                    extensions={[language.lang]}
                                />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="Test Cases">
                                <TestCaseTable
                                    input_output={
                                        (assessment?.challenge?.input_output as unknown as InputOutput) || {
                                            inputOutput: [],
                                            inputType: [],
                                            outputType: null,
                                        }
                                    }
                                    result={(assessment?.result as boolean[]) ?? []}
                                    showOnlyFirstTwoTestCases={false}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Row>
            )}
        </div>
    );
};

export default ReportPage;
