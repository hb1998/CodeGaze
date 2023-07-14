import { Button, Select } from 'antd';
import CodeMirror from '@uiw/react-codemirror';

import { ProgrammingLanguages } from './ProgrammingLanguages';
import { languageNameType, languageObjectType } from './Editor';
import classes from './Editor.module.css';

interface ICodeEditorProps {
    languageName: string;
    handleLanguageChange: (lang: languageNameType) => void;
    handleReset: () => void;
    code: string;
    codeEditorLang: languageObjectType['lang'];
    handleCodeChange: (value: string) => void;
}

const options = Object.entries(ProgrammingLanguages).map(([key, value]) => ({
    label: value.name,
    value: value.name,
}));

const CodeEditor = (props: ICodeEditorProps) => {
    return (
        <div className={`${classes.content} ${classes.pane2}`}>
            <div className={classes.editorHeader}>
                <Select
                    value={props.languageName}
                    onChange={(value) => props.handleLanguageChange(value as languageNameType)}
                    style={{ width: '7rem' }}
                    options={options}
                />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button type="primary" onClick={props.handleReset}>
                        Reset
                    </Button>
                    <Button type="primary">Save</Button>
                </div>
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
