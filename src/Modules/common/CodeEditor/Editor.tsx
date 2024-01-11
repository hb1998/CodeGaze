import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useAutosave } from 'react-autosave';
// SplitPane imports
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
// Components Import
import QuestionContent from './QuestionContent';
import CodeEditor from './CodeEditor';
import Output from './Output';
import TestCaseTable from './TestCaseTable';
import { ProgrammingLanguages, languageNameType, languageObjectType, languagesNameMap } from './ProgrammingLanguages';
import { CodeGenerator } from '../../CodeGeneration/CodeGenerator';
import { CodeEvaluator } from '../../CodeEvaluator/CodeEvaluator';
import { ChallengeAPIService } from '../../Challenges/services/Challenge.API';
import { AssessmentUpdateDto, Challenge } from '../../../types/Models';
import classes from './Editor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { IDispatch, IRootState } from '../../../store';
import { supabase } from '../../API/supabase';
import { FUNCTIONS } from '../../../constants/functions.constants';
import { toast } from 'react-toastify';
import { ROUTES } from '../../../constants/Route.constants';
import './styles/Editor.css';
import { Typography } from 'antd';
import { invokeSupabaseFunction } from '../../API/APIUtils';
const { Title } = Typography;

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
    const [saveLoading, setSaveLoading] = useState(false);
    const [testCaseLoading, setTestCaseLoading] = useState(false);
    const [lastSaved, setlastSaved] = useState(null);

    const evaluator = new CodeEvaluator(
        selectEditorLanguage.name,
        challenge?.input_output?.inputType,
        challenge?.input_output?.outputType,
    );

    const { state } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch<IDispatch>();
    const assessment = useSelector((state: IRootState) => state.assessment);
    const candidate = useSelector((state: IRootState) => state.candidate);
    const { challengeId } = useParams<{ challengeId: string }>();

    useEffect(() => {
        if (assessment?.code) {
            setCode(assessment.code);
        }
        if (assessment?.language) {
            setSelectEditorLanguage(languagesNameMap[assessment.language]);
        }
    }, [assessment]);

    useEffect(() => {
        if (state) {
            setChallenge(state?.challenge);
        } else {
            ChallengeAPIService.getById(challengeId)
                .then((response) => {
                    setChallenge(response as unknown as Challenge);
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
        if (!assessment?.code) updateBoilerCode(selectEditorLanguage['name']);
    }, [selectEditorLanguage, challenge, assessment]);

    const handleCodeChange = (value: string) => {
        setCode(value);
    };

    const handleRun = async () => {
        try {
            setrunLoading(true);
            setOutput('');
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
        const generator = new CodeGenerator(
            languageSelected,
            challenge?.input_output?.inputType,
            challenge?.input_output?.outputType,
        );
        const starterCode = generator.generateStarterCode();
        setCode(starterCode);
    };

    const handleReset = () => {
        updateBoilerCode(selectEditorLanguage['name']);
        setOutput('');
    };

    const handleTestCase = async () => {
        try {
            setTestCaseLoading(true);
            const { result, output } = await evaluator.evaluate(code, challenge?.input_output?.inputOutput);
            setOutput(output);
            setTestCaseLoading(false);
            setResult(result);
        } catch (error) {
            setTestCaseLoading(false);
            console.error('Error evaluating code:', error);
        }
    };

    const handleSave = async (code: string) => {
        try {
            setSaveLoading(true);
            await saveCode(code);
            setSaveLoading(false);
        } catch (error) {
            setSaveLoading(false);
            toast.error(error.message ?? 'Error saving code');
            console.error('Error evaluating code:', error);
        }
    };
    async function saveCode(code: string) {
        await invokeSupabaseFunction<AssessmentUpdateDto>(FUNCTIONS.UPDATE_ASSESSMENT, {
            id: assessment.id,
            code,
            language: selectEditorLanguage.name,
        } as AssessmentUpdateDto);
        setlastSaved(Date.now());
        dispatch.assessment.update({ ...assessment, code, language: selectEditorLanguage.name });
    }

    const handleSubmit = async () => {
        try {
            setSubmitLoading(true);
            const { result } = await evaluator.evaluate(code, challenge?.input_output?.inputOutput);
            await supabase.functions.setAuth(candidate?.token);
            await invokeSupabaseFunction<AssessmentUpdateDto>(FUNCTIONS.SUBMIT_EXAM, {
                id: assessment.id,
                code,
                language: selectEditorLanguage.name,
                result,
            } as AssessmentUpdateDto);
            dispatch.candidate.clear();
            dispatch.assessment.clear();
            navigate(ROUTES.ASSESSMENT_OVER);
            setSubmitLoading(false);
        } catch (error) {
            setSubmitLoading(false);
            toast.error(error.message ?? 'Error submitting code');
            console.error('Error evaluating code:', error);
        }
    };

    useAutosave({ data: code, onSave: saveCode, interval: 5000 });

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
                            saveLoading={saveLoading}
                            handleSave={() => handleSave(code)}
                            code={code}
                            lastSaved={lastSaved}
                            codeEditorLang={selectEditorLanguage.lang}
                            handleCodeChange={handleCodeChange}
                        />
                    </Pane>
                    <Pane>
                        <div className="output-container" style={{ padding: '1rem' }}>
                            <Output
                                output={output}
                                runLoading={runLoading}
                                handleRun={handleRun}
                                testCaseLoading={testCaseLoading}
                                handleTestCase={handleTestCase}
                                submitLoading={submitLoading}
                                handleSubmit={handleSubmit}
                            />
                            <Title level={4}>Test Cases</Title>
                            <TestCaseTable
                                input_output={
                                    challenge?.input_output || {
                                        inputOutput: [],
                                        inputType: [],
                                        outputType: null,
                                    }
                                }
                                result={result}
                            />
                        </div>
                    </Pane>
                </SplitPane>
            </div>
        </div>
    );
};

export default Editor;
