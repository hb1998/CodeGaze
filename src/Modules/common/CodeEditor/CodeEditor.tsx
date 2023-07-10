import { Button, Select, Typography } from 'antd';

import CodeMirror from '@uiw/react-codemirror';
import { ProgrammingLanguages } from './ProgrammingLanguages';

import classes from './Editor.module.css';

type LanguageName = (typeof ProgrammingLanguages)[keyof typeof ProgrammingLanguages]['name'];

const options = Object.entries(ProgrammingLanguages).map(([key, value]) => ({
    label: value.name,
    value: value.name,
}));

interface ICodeEditorProps {
    languageName: string;
    handleLanguageChange: (lang: LanguageName) => void;
    handleReset: () => void;
    code: string;
    codeEditorLang: any;
    handleCodeChange: (value: string) => void;
}

const CodeEditor = (props: ICodeEditorProps) => {
    return (
        <div className={`${classes.content} ${classes.pane2}`}>
            <div className={classes.editorHeader}>
                <Select
                    value={props.languageName}
                    onChange={(value) => props.handleLanguageChange(value as LanguageName)}
                    style={{ width: '7rem' }}
                    options={options}
                />
                <Button type="primary" onClick={props.handleReset}>
                    Reset
                </Button>
            </div>
            <CodeMirror
                value={props.code}
                height="70vh"
                theme="dark"
                extensions={[props.codeEditorLang]}
                onChange={props.handleCodeChange}
                style={{ padding: '0.5rem 1rem', overflow: 'auto' }}
            />
        </div>
    );
};

export default CodeEditor;
