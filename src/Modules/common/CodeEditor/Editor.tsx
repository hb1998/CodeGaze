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
import { Challenge } from '../../../types/Models';
import classes from './Editor.module.css';

export type languageObjectType = (typeof ProgrammingLanguages)[keyof typeof ProgrammingLanguages];
export type languageNameType = languageObjectType['name'];

const languagesNameMap = Object.keys(ProgrammingLanguages).reduce(
    (acc, key) => {
        acc[ProgrammingLanguages[key].name] = ProgrammingLanguages[key];
        return acc;
    },
    {} as Record<languageNameType, languageObjectType>,
);


const Editor = () => {
    const [sizes, setSizes] = useState([600, '100%', 750]);
    const [selectEditorLanguage, setSelectEditorLanguage] = useState<languageObjectType>(
        ProgrammingLanguages.javaScript,
    );
    const [code, setCode] = useState<string>('');
    const [output, setOutput] = useState<string>('');
    const [result, setResult] = useState<boolean[]>([]);
    const [challenge, setChallenge] = useState<Challenge>(null);
    const [runLoading, setrunLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [testCaseLoading, setTestCaseLoading] = useState(false);

    const evaluator = new CodeEvaluator(
        selectEditorLanguage.name,
        challenge?.input_output?.inputType,
        challenge?.input_output?.outputType,
    );

    const { state } = useLocation();

    const { challengeId } = useParams<{ challengeId: string }>();

    useEffect(() => {
        if (state) {
            setChallenge(state?.challenge);
        } else {
            ChallengeAPIService.getById(challengeId)
                .then((response) => {
                    setChallenge(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [challengeId, state]);

    const handleLanguageChange = (selectedLanguage: languageNameType) => {
        setSelectEditorLanguage(languagesNameMap[selectedLanguage]);
    };

    useEffect(() => {
        updateBoilerCode(selectEditorLanguage['name']);
    }, [selectEditorLanguage]);

    const handleCodeChange = (value: string) => {
        setCode(value);
    };

    const handleRun = async () => {
        try {
            setrunLoading(true);
            const result = await evaluator.runAndEvaluateCode(code, challenge?.input_output?.inputOutput);
            setOutput(result.stdout);
            setrunLoading(false);
            if (result.stdout === null) {
                setOutput(
                    `${result.status.description !== 'Accepted' ? result.status.description : ''}\n${result.stderr}\n${
                        result.compile_output !== null ? result.compile_output : ''
                    }`,
                );
            }
        } catch (error) {
            setrunLoading(false);
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

    const handleTestCase = async () => {
        try {
            setTestCaseLoading(true);
            const result = await evaluator.evaluate(code, challenge?.input_output?.inputOutput);
            setTestCaseLoading(false);
            setResult(result);
        } catch (error) {
            setTestCaseLoading(false);
            console.error('Error evaluating code:', error);
        }
    };

    const handleSubmit = async () => {
        try {
            setSubmitLoading(true);
            const result = await evaluator.evaluate(code, challenge?.input_output?.inputOutput);
            setSubmitLoading(false);
        } catch (error) {
            setSubmitLoading(false);
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
                            <Output
                                output={output}
                                runLoading={runLoading}
                                handleRun={handleRun}
                                testCaseLoading={testCaseLoading}
                                handleTestCase={handleTestCase}
                                submitLoading={submitLoading}
                                handleSubmit={handleSubmit}
                            />
                            <TestCaseTable input_output={challenge.input_output} result={result} />
                        </div>
                    </Pane>
                </SplitPane>
            </div>
        </div>
    );
};

export default Editor;
