import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Table, Tag } from 'antd';
import Title from 'antd/es/typography/Title';
import { sampleInput } from '../../../types/Models';
interface ITestCaseProps {
    result: boolean[];
}

const TestCaseTable = (props: ITestCaseProps) => {
    const testCaseResult = sampleInput.inputOutput.map((inputOutput, index) => {
        return {
            key: index,
            input: inputOutput.input,
            expected: inputOutput.output,
            result: props.result[index] ? 'Passed' : 'Failed',
        };
    });

    const colDef = [
        {
            title: 'Input',
            dataIndex: 'input',
            key: 'input',
        },
        {
            title: 'Expected',
            dataIndex: 'expected',
            key: 'expected',
        },
        {
            title: 'Result',
            dataIndex: 'result',
            key: 'result',
            render: (value: string) => {
                if (value === '') {
                    return null;
                }
                if (props.result.length === 0) {
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
