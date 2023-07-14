import { useEffect, useState } from 'react';
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
import { CodeGenerator, IParamType } from '../../CodeGeneration/CodeGenerator';

export type languageObjectType = (typeof ProgrammingLanguages)[keyof typeof ProgrammingLanguages];
export type languageNameType = languageObjectType['name'];

const Editor = () => {
    const [sizes, setSizes] = useState([300, '100%', '25%']);
    const [selectEditorLanguage, setSelectEditorLanguage] = useState<languageObjectType>(
        ProgrammingLanguages.javaScript,
    );
    const [code, setCode] = useState<string>('');
    const [output, setOutput] = useState<string>('');

    const handleLanguageChange = (selectedLanguage: languageNameType) => {
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

    useEffect(() => {
        updateBoilerCode(selectEditorLanguage['name']);
    }, [selectEditorLanguage]);

    const handleCodeChange = (value: string) => {
        setCode(value);
    };

    const handleRun = () => {
        Axios.post(import.meta.env.VITE_COMPILER_ENDPOINT || '', {
            source_code: code,
            language_id: selectEditorLanguage.id,
        })
            .then((response) => {
                setOutput(response.data.stdout);
                if (response.data.stdout === null) {
                    setOutput(
                        `${response.data.status.description !== 'Accepted' ? response.data.status.description : ''}\n${
                            response.data.stderr
                        }\n${response.data.compile_output !== null ? response.data.compile_output : ''}`,
                    );
                }
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    setOutput(`Compiler Error: ${error.response.data.error}`);
                } else {
                    setOutput('An error occurred while compiling the code.');
                }
                console.error('Error running code:', error);
            });
    };

    const updateBoilerCode = (languageSelected: languageNameType) => {
        const inputTypes: IParamType[] = [
            { type: 'number', name: 'n' },
            { type: 'arrayOfNumber', name: 'nums' },
        ];
        const outputTypes: IParamType = {
            type: 'number',
            name: 'int',
        };
        const generator = new CodeGenerator(languageSelected, inputTypes, outputTypes);
        const starterCode = generator.generateStarterCode();
        starterCode !== undefined ? setCode(starterCode) : setCode('');
    };

    const handleReset = () => {
        updateBoilerCode(selectEditorLanguage['name']);
        setOutput('');
    };

    const handleSubmit = () => {
        console.log('Submitted code:', code);
        console.log('Selected language:', selectEditorLanguage.name);
    };

    return (
        <div>
            <div className={classes.main}>
                <SplitPane
                    split="vertical"
                    sizes={sizes}
                    onChange={setSizes}
                    sashRender={() => {
                        return <div></div>;
                    }}
                >
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
