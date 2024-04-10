import { getQuestionSubmitVoById } from '@/services/questionSubmit/api';
import {
  Color,
  JUDGE_INFO_STATUS,
  languageLabel,
  submitStatusColor,
  submitStatusIcon,
  submitStatusText,
  SUBMIT_STATUS,
} from '@/utils/constants';
import { useModel, useNavigate, useSearchParams } from '@@/exports';
import { ClockCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Avatar, Button, Divider, Skeleton, Tag } from 'antd';
import MdEditor from 'md-editor-rt';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

type LogDetailProps = {
  targetSubmitId: number;
  logHeight: string;
  afterClose: () => void;
};

const LogDetail: React.FC<LogDetailProps> = ({ targetSubmitId, logHeight, afterClose }) => {
  const navigate = useNavigate();
  const [urlSearchParams] = useSearchParams();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const [questionSubmit, setQuestionSubmit] = useState<QuestionSubmit.QuestionSubmit>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    const fetchData = () => {
      if (targetSubmitId > 0) {
        getQuestionSubmitVoById(targetSubmitId).then((res) => {
          if (res.code === 200) {
            setLoading(false);
            setQuestionSubmit(res.data);
            // 如果状态是成功，则停止刷新
            if (questionSubmit?.status === SUBMIT_STATUS.SUCCEED) {
              clearInterval(intervalId);
            }
          }
        });
      }
    };

    // 定义一个启动定时器的函数
    const startInterval = () => {
      return setInterval(() => {
        // 只有当questionSubmit未定义或其状态不是成功时，才进行数据刷新
        if (!questionSubmit || questionSubmit.status !== SUBMIT_STATUS.SUCCEED) {
          fetchData();
        }
      }, 5000); // 每5秒刷新一次数据
    };

    fetchData(); // 首次加载时调用

    intervalId = startInterval(); // 启动定时器

    return () => clearInterval(intervalId); // 组件卸载时清除定时器
  }, [targetSubmitId, questionSubmit]); // 添加questionSubmit作为依赖项

  const closeDetail = () => {
    // 将搜索参数拼接到query上
    const params = new URLSearchParams({
      tab: urlSearchParams.get('tab') || 'content',
      targetSubmitId: '-1',
    });
    const pageNum = urlSearchParams.get('pageNum');
    if (pageNum) {
      params.append('pageNum', pageNum);
    }
    navigate({
      search: `?${params.toString()}`,
    });
    afterClose();
  };

  const closeCss = useEmotionCss(() => {
    return {
      color: 'rgb(140,140,140)',
      cursor: 'pointer',
      ':hover': {
        color: 'black',
      },
    };
  });

  return (
    <div>
      <div style={{ margin: '5px 16px' }}>
        <CloseOutlined className={closeCss} onClick={closeDetail} />
        <Divider style={{ margin: '5px 0 0 0' }} />
      </div>
      <div style={{ height: logHeight, overflow: 'scroll' }}>
        {!loading && questionSubmit ? (
          <div style={{ margin: '16px 20px' }}>
            <div style={{ display: 'flex' }}>
              <Avatar size="large" src={currentUser?.avatar} />
              <div style={{ marginLeft: 4, flex: '1 1 auto' }}>
                <div style={{ fontWeight: 600 }}>{currentUser?.username}</div>
                <div style={{ fontSize: 11, color: '#3c3c4399' }}>
                  {moment(new Date(questionSubmit?.createTime).toISOString()).format(
                    'YYYY-MM-DD HH:mm:ss',
                  )}
                </div>
              </div>

              <div style={{ float: 'right' }}>
                <span style={{ fontSize: 12, color: '#3c3c4399', marginRight: 16 }}>
                  通过测试用例：
                  <span style={{ fontSize: 16, color: 'black', fontWeight: 600 }}>
                    {questionSubmit.judgeInfo.pass} / {questionSubmit.judgeInfo.total}
                  </span>
                </span>

                <Button
                  size="large"
                  type="text"
                  style={{
                    color: submitStatusColor.get(questionSubmit.status),
                    fontSize: 18,
                    padding: '0 16px',
                  }}
                  icon={submitStatusIcon.get(questionSubmit.status)}
                >
                  {submitStatusText.get(questionSubmit.status)}
                </Button>
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <Tag style={{ borderRadius: 16, padding: '0 12px' }} color="processing">
                {languageLabel.get(questionSubmit.language)}
              </Tag>
              {questionSubmit.judgeInfo.time && (
                <Tag
                  icon={<ClockCircleOutlined />}
                  style={{ borderRadius: 16, padding: '0 12px' }}
                  color="processing"
                >
                  {questionSubmit.judgeInfo.time} ms
                </Tag>
              )}
              {questionSubmit.judgeInfo.memory && (
                <Tag
                  icon={<ClockCircleOutlined />}
                  style={{ borderRadius: 16, padding: '0 12px' }}
                  color="processing"
                >
                  {questionSubmit.judgeInfo.memory} MB
                </Tag>
              )}
            </div>

            {questionSubmit.status === SUBMIT_STATUS.FAILED && (
              <div
                style={{
                  marginTop: 16,
                  borderRadius: 8,
                  backgroundColor: '#000a2008',
                  padding: 16,
                  fontSize: 13,
                  color: '#262626bf',
                }}
              >
                <div>错误信息</div>
                <Divider style={{ margin: '4px 0' }} />
                <div style={{ color: Color.HARD }}>{questionSubmit.judgeInfo.message}</div>
                {questionSubmit.judgeInfo.status === JUDGE_INFO_STATUS.WRONG_ANSWER && (
                  <div style={{ marginTop: 16 }}>
                    <div>最后执行输入</div>
                    <Divider style={{ margin: '4px 0' }} />
                    <div style={{ color: 'black' }}>{questionSubmit.judgeInfo.input}</div>

                    <div style={{ marginTop: 16 }}>预期输出</div>
                    <Divider style={{ margin: '4px 0' }} />
                    <div style={{ color: Color.EASY }}>
                      {questionSubmit.judgeInfo.expectedOutput}
                    </div>

                    <div style={{ marginTop: 16 }}>实际输出</div>
                    <Divider style={{ margin: '4px 0' }} />
                    <div style={{ color: Color.HARD }}>{questionSubmit.judgeInfo.output}</div>
                  </div>
                )}
              </div>
            )}

            <MdEditor
              previewOnly={true}
              modelValue={`\`\`\`\n${questionSubmit?.code}\n\`\`\`` || ''}
              editorId="log"
            />
          </div>
        ) : (
          <div style={{ margin: '16px 20px' }}>
            <Skeleton paragraph={{ rows: 10 }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LogDetail;
