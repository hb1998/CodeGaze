import { Typography } from "antd";

import classes from "./Editor.module.css";
const { Text } = Typography;

const QuestionContent = () => {
  return (
    <div className={classes.content}>
      <Text strong>Question:</Text>
      <Text>Write a program that prints "Hello, World!" to the console.</Text>
    </div>
  );
};

export default QuestionContent;
