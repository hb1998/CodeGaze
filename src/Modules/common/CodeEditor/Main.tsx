import { useState } from 'react';
import Axios from 'axios';
// SplitPane imports
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
// Components Import
import QuestionContent from './QuestionContent';
import CodeEditor from './CodeEditor';
import { ProgrammingLanguages } from './ProgrammingLanguages';
import Output from './Output';
import classes from './Editor.module.css';

type ISelectedEditorLanguage = (typeof ProgrammingLanguages)[keyof typeof ProgrammingLanguages];

const Editor = () => {
    const [selectEditorLanguage, setSelectEditorLanguage] = useState<ISelectedEditorLanguage>(
        ProgrammingLanguages.javaScript,
    );
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');

    const handleLanguageChange = (
        selectedLanguage: (typeof ProgrammingLanguages)[keyof typeof ProgrammingLanguages]['name'],
    ) => {
        switch (selectedLanguage) {
            case 'Python':
                setSelectEditorLanguage(ProgrammingLanguages.python);
                break;
            case 'Java':
                setSelectEditorLanguage(ProgrammingLanguages.java);
                break;
            case 'C':
                setSelectEditorLanguage(ProgrammingLanguages.c);
                break;
            case 'C++':
                setSelectEditorLanguage(ProgrammingLanguages.cpp);
                break;
            default:
                setSelectEditorLanguage(ProgrammingLanguages.javaScript);
                break;
        }
    };

    const handleCodeChange = (value: string) => {
        setCode(value);
    };

    const handleRun = () => {
        Axios.post(process.env.compilerEndpoint || '', {
            source_code: code,
            language_id: selectEditorLanguage.id,
        }).then((response) => {
            setOutput(response.data.stdout);
            console.log(response.data);
        });
    };

    const handleReset = () => {
        setCode('');
        setOutput('');
    };

    const handleSubmit = () => {
        console.log('Submitted code:', code);
        console.log('Selected language:', selectEditorLanguage.name);
    };
    const [sizes, setSizes] = useState([300, '100%', '25%']);

    return (
        <div>
            <div className={classes.main}>
                <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
                    <Pane>
                        <QuestionContent />
                    </Pane>
                    <Pane minSize="50%" maxSize="80%" style={{ margin: '2px' }}>
                        <CodeEditor
                            languageName={selectEditorLanguage.name}
                            handleLanguageChange={handleLanguageChange}
                            handleReset={handleReset}
                            code={code}
                            codeEditorLang={selectEditorLanguage.lang}
                            handleCodeChange={handleCodeChange}
                        />
                    </Pane>
                    <Pane>
                        <Output output={output} handleRun={handleRun} handleSubmit={handleSubmit} />
                    </Pane>
                </SplitPane>
            </div>
        </div>
    );
};

export default Editor;
