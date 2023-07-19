import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
// SplitPane imports
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
// Components Import
import QuestionContent from './QuestionContent';
import CodeEditor from './CodeEditor';
import Output from './Output';
import TestCaseTable from './TestCaseTable';
import { ProgrammingLanguages } from './ProgrammingLanguages';
import { CodeGenerator } from '../../CodeGeneration/CodeGenerator';
import { IParamType } from '../../../types/Evaluator.types';
import { CodeEvaluator } from '../../CodeEvaluator/CodeEvaluator';
import { ChallengeAPIService } from '../../Challenges/services/Challenge.API';
import { sampleInput } from '../../../types/Models';
import classes from './Editor.module.css';

export type languageObjectType = (typeof ProgrammingLanguages)[keyof typeof ProgrammingLanguages];
export type languageNameType = languageObjectType['name'];

const Editor = () => {
    const [sizes, setSizes] = useState([500, '100%', '35%']);
    const [selectEditorLanguage, setSelectEditorLanguage] = useState<languageObjectType>(
        ProgrammingLanguages.javaScript,
    );
    const [code, setCode] = useState<string>('');
    const [output, setOutput] = useState<string>('');
    const [result, setResult] = useState<boolean[]>([]);
    const [challenge, setChallenge] = useState(null);
    const evaluator = new CodeEvaluator(selectEditorLanguage.name, sampleInput.inputType, sampleInput.outputType);

    const { pathname, state } = useLocation();
    const rootPath = pathname.split('/')[1];
    const isChallenge = rootPath === 'challenges';

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (isChallenge) {
            if (state) {
                setChallenge(state);
            } else {
                ChallengeAPIService.getById(id)
                    .then((response) => {
                        setChallenge(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    }, [id, isChallenge, state]);

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

    const handleRun = async () => {
        try {
            const result = await evaluator.runAndEvaluateCode(code, sampleInput.inputOutput);
            setOutput(result.stdout);
            if (result.stdout === null) {
                setOutput(
                    `${result.status.description !== 'Accepted' ? result.status.description : ''}\n${result.stderr}\n${result.compile_output !== null ? result.compile_output : ''
                    }`,
                );
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setOutput(`Compiler Error: ${error.response.data.error}`);
            } else {
                setOutput('An error occurred while compiling the code.');
            }
            console.error('Error running code:', error);
        }
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

    const handleSubmit = async () => {
        try {
            const result = await evaluator.evaluate(code, sampleInput.inputOutput);
            setResult(result);
        } catch (error) {
            console.error('Error evaluating code:', error);
        }
    };

    return (
        <div>
            <div className={classes.main} style={{ padding: '1rem' }}>
                <SplitPane
                
                    split="vertical"
                    sizes={sizes}
                    onChange={setSizes}
                    sashRender={() => {
                        return <div></div>;
                    }}
                >
                    <Pane>
                        <QuestionContent challenge={challenge} />
                    </Pane>
                    <Pane className={classes.Resizer} minSize="50%" maxSize="80%" style={{ margin: '2px' }}>
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
                        <div style={{ padding: '1rem' }}>
                            <Output output={output} handleRun={handleRun} handleSubmit={handleSubmit} />
                            <TestCaseTable result={result} />
                        </div>
                    </Pane>
                </SplitPane>
            </div>
        </div >
    );
};

export default Editor;
