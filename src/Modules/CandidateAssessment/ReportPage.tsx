import React from 'react';
import { AssessmentQueryResult } from '../Dashboard/Dashboard';
import { Button, Card, Col, Row } from 'antd';
import CodeMirror from '@uiw/react-codemirror';
import { languagesNameMap } from '../common/CodeEditor/ProgrammingLanguages';
import TestCaseTable from '../common/CodeEditor/TestCaseTable';
import { InputOutput } from '../../types/Models';
import { useLocation } from 'react-router';

const ReportPage: React.FC = () => {
    const state = useLocation().state;
    const assessment = state?.assessment as AssessmentQueryResult[number];
    const language = languagesNameMap[assessment.language];

    return (
        <div style={{ padding: '24px' }}>
            <Card >
                <p>Name: {assessment.candidate.name}</p>
                <p>Email: {assessment.candidate.emailId}</p>
            </Card>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Card title="Code">
                        <CodeMirror
                            value={assessment.code}
                            height="calc(100vh - 12rem)"
                            theme="dark"
                            extensions={[language.lang]}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Test Cases">
                        <TestCaseTable
                            input_output={assessment.challenge.input_output as unknown as InputOutput}
                            result={assessment.result as boolean[]}
                            showOnlyFirstTwoTestCases={false}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ReportPage;
