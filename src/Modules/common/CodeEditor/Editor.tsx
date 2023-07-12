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
import { CodeGenerator, IParamType, Language } from '../../CodeGeneration/CodeGenerator';

export type languageType = (typeof ProgrammingLanguages)[keyof typeof ProgrammingLanguages];

const Editor = () => {
    const [selectEditorLanguage, setSelectEditorLanguage] = useState<languageType>(ProgrammingLanguages.javaScript);
    const [code, setCode] = useState();
    const [output, setOutput] = useState('');

    const handleLanguageChange = (selectedLanguage: languageType['name']) => {
        switch (selectedLanguage) {
            case 'Python':
                setSelectEditorLanguage(ProgrammingLanguages.python);
                generateStarterCode(Language.Python);
                break;
            case 'Java':
                setSelectEditorLanguage(ProgrammingLanguages.java);
                generateStarterCode(Language.Java);
                break;
            case 'C':
                setSelectEditorLanguage(ProgrammingLanguages.c);
                generateStarterCode(Language.C);
                break;
            case 'C++':
                setSelectEditorLanguage(ProgrammingLanguages.cpp);
                generateStarterCode(Language.CPP);
                break;
            default:
                setSelectEditorLanguage(ProgrammingLanguages.javaScript);
                generateStarterCode(Language.JavaScript);
                break;
        }
    };

    useEffect(() => {
        generateStarterCode(Language.JavaScript);
    }, []);

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
                console.log(response.data);
                console.log(response.data.status.description);
                if (response.data.stdout === null) {
                    setOutput(`${response.data.status.description}\n${response.data.stderr}`);
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

    const generateStarterCode = (languageSelected: Language) => {
        const inputTypes: IParamType[] = [
            { type: 'number', name: 'n' },
            { type: 'arrayOfNumber', name: 'nums' },
        ];
        const outputTypes: string[] = ['number'];

        const generator = new CodeGenerator(languageSelected, inputTypes, outputTypes);

        const starterCode = generator.generateStarterCode();

        setCode(starterCode);
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
