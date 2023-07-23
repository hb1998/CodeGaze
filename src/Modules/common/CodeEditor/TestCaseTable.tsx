import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Table, Tag } from 'antd';
import Title from 'antd/es/typography/Title';
import { Challenge } from '../../../types/Models';
interface ITestCaseProps {
    result: boolean[];
    input_output: Challenge['input_output'];
}

const TestCaseTable = ({ result, input_output }: ITestCaseProps) => {
    const testCaseResult = input_output.inputOutput.map((inputOutput, index) => {
        return {
            key: index,
            input: inputOutput.input,
            expected: inputOutput.output,
            result: result[index] ? 'Passed' : 'Failed',
        };
    });

    const colDef = [
        {
            title: 'Input',
            dataIndex: 'input',
            key: 'input',
            render: (inputs: string[]) => (
                <div>
                    {inputs.map((input, index) => (
                        <Tag key={index}>{input}</Tag>
                    ))}
                </div>
            ),
        },
        {
            title: 'Expected',
            dataIndex: 'expected',
            key: 'expected',
            render: (output: string) => (
                <div>
                    <Tag>{output}</Tag>
                </div>
            ),
        },
        {
            title: 'Result',
            dataIndex: 'result',
            key: 'result',
            render: (value: string) => {
                if (value === '') {
                    return null;
                }
                if (result.length === 0) {
                    return '';
                }
                const isPass = value === 'Passed';
                const color = isPass ? 'green' : 'red';
                return (
                    <Tag icon={isPass ? <CheckCircleOutlined /> : <CloseCircleOutlined />} color={color}>
                        {value}
                    </Tag>
                );
            },
        },
    ];

    return (
        <div style={{ height: '30%' }}>
            <Title level={4}>Test Cases</Title>
            <Table dataSource={testCaseResult} columns={colDef} pagination={false} />
        </div>
    );
};

export default TestCaseTable;
