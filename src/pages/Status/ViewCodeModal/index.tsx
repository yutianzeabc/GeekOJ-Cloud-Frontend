import { getQuestionSubmitVoById } from '@/services/questionSubmit/api';
import { terminal } from '@@/exports';
import { Button, Modal } from 'antd';
import MdEditor from 'md-editor-rt';
import React, { useEffect, useState } from 'react';

type ViewCodeModalProps = {
  visible: boolean;
  targetId: number;
  onDone: () => void;
};

const ViewCodeModal: React.FC<ViewCodeModalProps> = ({ visible, targetId, onDone }) => {
  const [sourceCode, setSourceCode] = useState<string>('');

  const handleClose = () => {
    onDone();
  };

  //有关targetId的
  useEffect(() => {
    if (targetId > 0) {
      getQuestionSubmitVoById(targetId).then((res) => {
        if (res.code === 200) {
          terminal.log(res.data);
          const questionSubmitVo: QuestionSubmit.QuestionSubmit = res.data;
          if (questionSubmitVo.code !== null) {
            setSourceCode(questionSubmitVo.code);
          } else {
            setSourceCode('当前用户暂无权限，仅支持查看本人提交的代码！');
          }
        }
      });
    }
  }, [targetId]);

  return (
    <Modal
      width={1000}
      maskClosable={false}
      open={visible}
      title={<div style={{ fontWeight: 600, fontSize: 16, textAlign: 'center' }}>查看代码</div>}
      centered={true}
      onCancel={handleClose}
      footer={[
        <Button key="close" type="primary" onClick={handleClose}>
          关闭
        </Button>,
      ]}
    >
      <MdEditor
        previewOnly={true}
        modelValue={`\`\`\`\n${sourceCode}\n\`\`\`` || ''}
        editorId="view"
      />
    </Modal>
  );
};

export default ViewCodeModal;
