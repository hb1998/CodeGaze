import { Button, Select } from 'antd';
import CodeMirror from '@uiw/react-codemirror';
import { ProgrammingLanguages, languageNameType, languageObjectType } from './ProgrammingLanguages';
import classes from './Editor.module.css';

interface ICodeEditorProps {
    languageName: string;
    handleLanguageChange: (lang: languageNameType) => void;
    handleReset: () => void;
    saveLoading: boolean;
    handleSave: () => void;
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
                    <Button  onClick={props.handleReset}>
                        Reset
                    </Button>
                    <Button loading={props.saveLoading} disabled={props.saveLoading} type="primary" onClick={props.handleSave}>
                        Save
                    </Button>
                </div>
            </div>
            <CodeMirror
                value={props.code}
                height="calc(100vh - 12rem)"
                theme="dark"
                extensions={[props.codeEditorLang]}
                onChange={props.handleCodeChange}
                style={{ padding: '0.5rem 1rem', overflow: 'auto' }}
            />
        </div>
    );
};

export default CodeEditor;
