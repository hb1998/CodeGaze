import MDEditor from '@uiw/react-md-editor';
import classes from './Editor.module.css';
import { Challenge } from '../../../types/Models';
import Title from 'antd/es/typography/Title';

const QuestionContent = ({ challenge }: { challenge: Challenge }) => {
    return (
        <div className={`${classes.content} ${classes.pane1}`}>
            <Title style={{ margin: '0.5rem 0' }} level={5}>
                {challenge?.name}
            </Title>
            <MDEditor
                value={challenge?.description}
                hideToolbar={true}
                preview={'preview'}
                height={'calc(100% - 30px)'}
            />
        </div>
    );
};

export default QuestionContent;
