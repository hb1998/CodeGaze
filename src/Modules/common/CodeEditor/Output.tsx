import { FileDoneOutlined, OrderedListOutlined, PlaySquareOutlined, SaveOutlined } from '@ant-design/icons';
import classes from './Editor.module.css';
import { Button } from 'antd';

interface OutputProps {
    output: string;
    runLoading: boolean;
    handleRun: () => void;
    testCaseLoading: boolean;
    handleTestCase: () => void;
    submitLoading: boolean;
    handleSubmit: () => void;
}

const Output = (props: OutputProps) => {
    return (
        <div className={`${classes.pane3}`}>
            <div className={classes.buttonContainer}>
                <Button
                    loading={props.runLoading}
                    disabled={props.runLoading}
                    icon={<PlaySquareOutlined />}
                    onClick={props.handleRun}
                >
                    Run
                </Button>
                <Button
                    loading={props.testCaseLoading}
                    disabled={props.testCaseLoading}
                    icon={<OrderedListOutlined />}
                    onClick={props.handleTestCase}
                >
                    Run Test Cases
                </Button>
                <Button
                    loading={props.submitLoading}
                    type="primary"
                    icon={<FileDoneOutlined />}
                    onClick={props.handleSubmit}
                >
                    Submit
                </Button>
            </div>
            <div
                style={{
                    height: '20rem',
                    border: '1px solid #d9d9d9',
                    padding: 8,
                    backgroundColor: '#1e293b',
                    color: 'lightgray',
                    whiteSpace: 'pre-wrap',
                    overflow: 'auto',
                }}
            >
                {props.output}
            </div>
        </div>
    );
};

export default Output;
