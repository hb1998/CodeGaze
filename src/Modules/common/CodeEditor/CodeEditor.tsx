import { Button, Select, Typography } from 'antd';

import CodeMirror from '@uiw/react-codemirror';
import { ProgrammingLanguages } from './ProgrammingLanguages';

import classes from './Editor.module.css';

const { Text } = Typography;

interface ICodeEditorProps {
    languageName: string;
    handleLanguageChange: (lang: (typeof ProgrammingLanguages)[keyof typeof ProgrammingLanguages]['name']) => void;
    handleReset: () => void;
    code: string;
    codeEditorLang: any;
    handleCodeChange: (value: string) => void;
}

const options = Object.entries(ProgrammingLanguages).map(([key, value]) => ({
    label: value.name,
    value: value.name,
}));

const CodeEditor = (props: ICodeEditorProps) => {
    return (
        <div className={`${classes.content} ${classes.pane2}`} style={{ padding: '1rem', marginRight: '0.5rem' }}>
            <div className={classes.editorHeader}>
                <div>
                    <Text strong style={{ paddingRight: '1rem' }}>
                        Select Language:
                    </Text>
                    <Select
                        value={props.languageName}
                        onChange={(value) =>
                            props.handleLanguageChange(value as 'C' | 'C++' | 'Java' | 'Javascript' | 'Python')
                        }
                        style={{ width: '7rem' }}
                        options={options}
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
                style={{ borderRadius: '1rem' }}
            />
        </div>
    );
};

export default CodeEditor;
