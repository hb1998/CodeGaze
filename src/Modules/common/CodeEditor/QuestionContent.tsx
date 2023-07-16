import MDEditor from '@uiw/react-md-editor';
import classes from './Editor.module.css';
import { Challenge } from '../../../types/Models';

const QuestionContent = ({ challenge }: { challenge: Challenge }) => {
  return (
    <div className={`${classes.content} ${classes.pane1}`}>
      <MDEditor value={challenge?.description} hideToolbar={true} preview={'preview'} height={'100%'} />
    </div>
  );
};

export default QuestionContent;
