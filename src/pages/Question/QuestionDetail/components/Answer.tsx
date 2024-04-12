import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Empty } from 'antd';
import MdEditor from 'md-editor-rt';
import React from 'react';

type AnsProps = {
  answer: string;
};

const Answer: React.FC<AnsProps> = ({ answer }) => {
  const catalog = useEmotionCss(() => {
    return {
      padding: '0 20px',
      maxHeight: 'calc(100vh - 132px)',
      overflow: 'auto',
      '.title': {
        fontSize: '1.125rem',
        lineHeight: '1.75rem',
      },
    };
  });

  return (
    <div className={catalog}>
      {answer && answer.length > 0 ? (
        <MdEditor previewOnly={true} modelValue={answer} editorId="answer" />
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default Answer;
