import { Button, Select, Typography } from "antd";

import CodeMirror from "@uiw/react-codemirror";
import { ProgrammingLanguages } from "./ProgrammingLanguages";

import classes from "./Editor.module.css";

const { Text } = Typography;

interface CodeEditorProps {
  language: string;
  handleLanguageChange: (lang: string) => void;
  handleReset: () => void;
  code: string;
  codeEditorLang: any;
  handleCodeChange: (value: string) => void;
}

const CodeEditor = (props: CodeEditorProps) => {
  return (
    <div className={classes.content}>
      <div className={classes.editorHeader}>
        <div>
          <Text strong style={{ paddingRight: "1rem" }}>
            Select Language:
          </Text>
          <Select
            value={props.language}
            onChange={(value) => props.handleLanguageChange(value)}
            style={{ width: "6rem" }}
            options={Object.entries(ProgrammingLanguages).map(
              ([key, value]) => ({
                label: value.name,
                value: value.name,
              })
            )}
          />
        </div>
        <Button type="primary" onClick={props.handleReset}>
          Reset
        </Button>
      </div>
      <CodeMirror
        value={props.code}
        minHeight="100vh"
        theme="dark"
        extensions={[props.codeEditorLang]}
        onChange={props.handleCodeChange}
      />
    </div>
  );
};

export default CodeEditor;
