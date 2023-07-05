import React, { useState } from "react";
import { Button, Select, Typography } from "antd";
import Axios from "axios";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import classes from "./Editor.module.css";

import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";

const { Text } = Typography;

const ProgrammingLanguages = {
  c: {
    id: 50,
    name: "C",
  },
  cpp: {
    id: 54,
    name: "C++",
  },
  java: {
    id: 62,
    name: "Java",
  },
  javaScript: {
    id: 63,
    name: "Javascript",
  },
  python: {
    id: 71,
    name: "Python",
  },
};

const Editor = () => {
  const [language, setLanguage] = useState("Javascript");
  const [languageId, setLanguageId] = useState(63);
  const [codeEditorLang, setCodeEditorLang] = useState(
    javascript({ jsx: true })
  );
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleLanguageChange = (value: string) => {
    setLanguage(value);

    switch (value) {
      case "Python":
        setCodeEditorLang(python);
        setLanguageId(ProgrammingLanguages.python.id);
        break;
      case "Java":
        setCodeEditorLang(java);
        setLanguageId(ProgrammingLanguages.java.id);
        break;
      case "C":
        setCodeEditorLang(cpp);
        setLanguageId(ProgrammingLanguages.c.id);
        break;
      case "C++":
        setCodeEditorLang(cpp);
        setLanguageId(ProgrammingLanguages.cpp.id);
        break;
      default:
        setCodeEditorLang(javascript({ jsx: true }));
        setLanguageId(ProgrammingLanguages.javaScript.id);
        break;
    }
  };

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  const handleRun = () => {
    Axios.post(
      "http://localhost:2358/submissions/?base64_encoded=false&wait=true",
      {
        source_code: code,
        language_id: languageId,
      }
    ).then((response) => {
      setOutput(response.data.stdout);
      console.log(response.data);
    });
  };

  const handleReset = () => {
    setCode("");
    setOutput("");
  };

  const handleSubmit = () => {
    console.log("Submitted code:", code);
    console.log("Selected language:", language);
  };
  const [sizes, setSizes] = useState([250, "80%", "25%"]);

  return (
    <div>
      <div className={classes.main}>
        <SplitPane
          split="vertical"
          sizes={sizes}
          onChange={setSizes}
          className="split-pane"
        >
          <Pane>
            <div className={classes.content}>
              <Text strong>Question:</Text>
              <Text>
                Write a program that prints "Hello, World!" to the console.
              </Text>
            </div>
          </Pane>
          <Pane minSize="50%" maxSize="80%">
            <div className={classes.content}>
              <div className={classes.editorHeader}>
                <div>
                  <Text strong style={{ paddingRight: "1rem" }}>
                    Select Language:
                  </Text>
                  <Select
                    value={language}
                    onChange={(value) => handleLanguageChange(value)}
                    style={{ width: "6rem" }}
                    options={Object.entries(ProgrammingLanguages).map(
                      ([key, value]) => ({
                        label: value.name,
                        value: value.name,
                      })
                    )}
                  />
                </div>
                <Button type="primary" onClick={handleReset}>
                  Reset
                </Button>
              </div>
              <CodeMirror
                value={code}
                height="30rem"
                theme="dark"
                extensions={[codeEditorLang]}
                onChange={handleCodeChange}
              />
            </div>
          </Pane>
          <Pane>
            <div className={classes.content}>
              <Text strong>Output:</Text>
              <div
                style={{
                  minHeight: 100,
                  border: "1px solid #d9d9d9",
                  padding: 8,
                }}
              >
                {output}
              </div>
              <div className={classes.buttonContainer}>
                <Button
                  type="primary"
                  style={{ marginTop: 16 }}
                  onClick={handleRun}
                >
                  Run
                </Button>
                <Button
                  type="primary"
                  style={{ marginTop: 16 }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Pane>
        </SplitPane>
      </div>
    </div>
  );
};

export default Editor;
