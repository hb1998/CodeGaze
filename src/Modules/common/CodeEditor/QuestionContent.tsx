import MDEditor from '@uiw/react-md-editor';
import classes from './Editor.module.css';
import { Challenge } from '../../../types/Models';
import Title from 'antd/es/typography/Title';
import React from 'react';

const QuestionContent = ({
    challenge,
    hideTitle = false,
    editorStyles = {},
}: {
    challenge: Pick<Challenge,'description' | 'name'>;
    hideTitle?: boolean;
    editorStyles?: React.CSSProperties;
}) => {
    return (
        <div className={`${classes.content} ${classes.pane1}`}>
            {!hideTitle && (
                <Title style={{ margin: '0.5rem 0' }} level={5}>
                    {challenge?.name}
                </Title>
            )}
            <MDEditor
                value={challenge?.description}
                hideToolbar={true}
                preview={'preview'}
                style={editorStyles}
                height={editorStyles.height}
            />
        </div>
    );
};

export default QuestionContent;
