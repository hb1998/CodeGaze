import classes from "./Editor.module.css";
import { Button, Typography } from "antd";

const { Text } = Typography;

interface OutputProps {
  output: string;
  handleRun: () => void;
  handleSubmit: () => void;
}

const Output = (props: OutputProps) => {
  return (
    <div className={`${classes.content} ${classes.pane3}`}>
      <Text strong>Output:</Text>
      <div
        style={{
          minHeight: 100,
          border: "1px solid #d9d9d9",
          padding: 8,
        }}
      >
        {props.output}
      </div>
      <div className={classes.buttonContainer}>
        <Button
          type="primary"
          style={{ marginTop: 16 }}
          onClick={props.handleRun}
        >
          Run
        </Button>
        <Button
          type="primary"
          style={{ marginTop: 16 }}
          onClick={props.handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Output;
