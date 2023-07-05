import { useState } from "react";
import Axios from "axios";
// CodeMirror Languages Imports
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
// SplitPane imports
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
// Components Import
import QuestionContent from "./QuestionContent";
import CodeEditor from "./CodeEditor";
import { ProgrammingLanguages } from "./ProgrammingLanguages";
import Output from "./Output";
import classes from "./Editor.module.css";

const Editor = () => {
  const [language, setLanguage] = useState("Javascript");
  const [languageId, setLanguageId] = useState(63);
  const [codeEditorLang, setCodeEditorLang] = useState(
    javascript({ jsx: true })
  );
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleLanguageChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);

    switch (selectedLanguage) {
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
  const [sizes, setSizes] = useState([300, "100%", "25%"]);

  return (
    <div>
      <div className={classes.main}>
        <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
          <Pane>
            <QuestionContent />
          </Pane>
          <Pane minSize="50%" maxSize="80%" className={classes.pane}>
            <CodeEditor
              language={language}
              handleLanguageChange={handleLanguageChange}
              handleReset={handleReset}
              code={code}
              codeEditorLang={codeEditorLang}
              handleCodeChange={handleCodeChange}
            />
          </Pane>
          <Pane>
            <Output
              output={output}
              handleRun={handleRun}
              handleSubmit={handleSubmit}
            />
          </Pane>
        </SplitPane>
      </div>
    </div>
  );
};

export default Editor;
