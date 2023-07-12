import { Button, Select } from 'antd';

import CodeMirror from '@uiw/react-codemirror';
import { ProgrammingLanguages } from './ProgrammingLanguages';

import classes from './Editor.module.css';
import { languageType } from './Editor';

const options = Object.entries(ProgrammingLanguages).map(([key, value]) => ({
    label: value.name,
    value: value.name,
}));

interface ICodeEditorProps {
    languageName: string;
    handleLanguageChange: (lang: languageType['name']) => void;
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
                    onChange={(value) => props.handleLanguageChange(value as languageType['name'])}
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
