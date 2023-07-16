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
import { CodeGenerator } from '../../CodeGeneration/CodeGenerator';
import { IInputOutput, IParamType } from '../../../types/Evaluator.types';
import { CodeEvaluator } from '../../CodeEvaluator/CodeEvaluator';
import { useLocation, useParams } from 'react-router';
import { ChallengeAPIService } from '../../Challenges/services/Challenge.API';
import { Table, Tag } from 'antd';
import Title from 'antd/es/typography/Title';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

export type languageObjectType = (typeof ProgrammingLanguages)[keyof typeof ProgrammingLanguages];
export type languageNameType = languageObjectType['name'];

const sampleInput = {
    "inputType": [
        {
            "name": "numberParam",
            "type": "number"
        },
        {
            "name": "numberArrayParam",
            "type": "arrayOfNumber"
        }
    ] as IParamType[],
    "outputType": {
        "name": "output",
        "type": "number"
    } as IParamType,
    "inputOutput": [
        {
            "input": [
                "4",
                `[1,2,3]`
            ],
            "output": "4"
        },
        {
            "input": ['3', '[1, 2, 3]'],
            "output": '3'
        }
    ] as IInputOutput[]
}

const colDef = [
    {
        title: 'Input',
        dataIndex: 'input',
        key: 'input',
    },
    {
        title: 'Expected',
        dataIndex: 'expected',
        key: 'expected',
    },
    {
        title: 'Result',
        dataIndex: 'result',
        key: 'result',
        render: (value: string) => {
            const isPass = value === 'Passed'
            const color = isPass ? 'green' : 'red'
            return <Tag icon={isPass ? <CheckCircleOutlined /> : <CloseCircleOutlined />} color={color}>{value}</Tag>
        }

    }
]

const Editor = () => {
    const [sizes, setSizes] = useState([500, '100%', '25%']);
    const [selectEditorLanguage, setSelectEditorLanguage] = useState<languageObjectType>(
        ProgrammingLanguages.javaScript,
    );
    const [code, setCode] = useState<string>('');
    const [output, setOutput] = useState<string>('');
    const [result, setResult] = useState<boolean[]>([]);
    const [challenge, setchallenge] = useState(null)

    const { pathname, state } = useLocation()
    const rootPath = pathname.split('/')[1];
    const isChallenge = rootPath === 'challenges';

    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        if (isChallenge) {
            if (state) {
                setchallenge(state)
            } else {
                ChallengeAPIService.getById(id).then((response) => {
                    setchallenge(response)
                }).catch((error) => {
                    console.log(error)
                })

            }
        }
    }, [id, isChallenge, state])


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
                        `${response.data.status.description !== 'Accepted' ? response.data.status.description : ''}\n${response.data.stderr
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

    const handleSubmit = async () => {
        const evaluator = new CodeEvaluator(selectEditorLanguage.name, sampleInput.inputType, sampleInput.outputType);
        try {
            const result = await evaluator.evaluate(code, sampleInput.inputOutput);
            setResult(result);
        } catch (error) {
            console.error('Error evaluating code:', error);
        }
    };

    const testCaseResult = sampleInput.inputOutput.map((inputOutput, index) => {
        return {
            key: index,
            input: inputOutput.input,
            expected: inputOutput.output,
            result: result[index] ? 'Passed' : 'Failed',
        };
    });

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
                        <QuestionContent challenge={challenge} />
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
                        <div>
                            <Output output={output} handleRun={handleRun} handleSubmit={handleSubmit} />
                            <div>
                                <Title level={4}>Test Cases</Title>
                                <Table dataSource={testCaseResult} columns={colDef} pagination={false} />
                            </div>
                        </div>
                    </Pane>
                </SplitPane>
            </div>
        </div>
    );
};

export default Editor;
