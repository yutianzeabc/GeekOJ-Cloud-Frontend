import ViewCodeModal from '@/pages/Status/ViewCodeModal';
import { listAllQuestionSubmitVoByPage } from '@/services/questionSubmit/api';
import { IconFont } from '@/utils';
import { languageLabel, UserRole } from '@/utils/constants';
import { history } from '@@/core/history';
import { useSearchParams } from '@@/exports';
import { RedoOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Card, Steps, Tag, Tooltip } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'umi';

const SubmitStatus: React.FC = () => {
  const navigate = useNavigate();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [urlSearchParams] = useSearchParams();
  const [visible, setVisible] = useState<boolean>(false);
  const [targetId, setTargetId] = useState<number>(-1);
  const [dataSource, setDataSource] = useState<QuestionSubmit.QuestionSubmit[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  //搜索参数
  const [pageNum, setPageNum] = useState(() => {
    return Number(urlSearchParams.get('pageNum')) || 1;
  });

  //重新获取数据
  const reloadData = () => {
    setLoading(true);
    listAllQuestionSubmitVoByPage({
      pageNum,
    }).then((res) => {
      if (res.code === 200) {
        setDataSource(res.data.records);
        setTotal(res.data.total);
        setLoading(false);
      }
    });
  };

  //监听路径参数变化
  useEffect(() => {
    reloadData();
  }, [location.search]);

  //有关搜索参数
  const updateQueryParam = (pageNum: number) => {
    const params = new URLSearchParams({
      pageNum: pageNum.toString(),
    });
    //将搜索参数拼接到query上
    navigate({
      search: `?${params.toString()}`,
    });
  };
  const changePage = (page: number) => {
    //将参数拼接到path上
    setPageNum(page);
    updateQueryParam(page);
  };

  //针对题目的操作
  const clickInspect = (id: number) => {
    if (!currentUser || currentUser.userRole === UserRole.GUEST) {
      history.push('/user/login');
      return;
    }
    setVisible(true);
    setTargetId(id);
  };

  const onViewDone = () => {
    setVisible(false);
  };

  const columns: ProColumns<QuestionSubmit.QuestionSubmit>[] = [
    {
      title: '提交 ID',
      dataIndex: 'id',
      ellipsis: true,
      width: '6%',
      align: 'center',
    },
    {
      title: '用户 ID',
      dataIndex: 'userId',
      ellipsis: true,
      width: '6%',
      align: 'center',
    },
    {
      title: '语言',
      ellipsis: true,
      width: '6%',
      align: 'center',
      render: (dom, entity) => {
        return <>{languageLabel.get(entity.language)}</>;
      },
    },
    {
      title: '题目',
      ellipsis: true,
      width: '15%',
      render: (dom, entity) => (
        <a
          onClick={() => {
            if (!currentUser || currentUser.userRole === UserRole.GUEST) {
              history.push(`/user/login?redirect=/question/${entity.questionId}`);
              return;
            }
            history.push(`/question/${entity.questionId}`);
          }}
        >{`${entity.questionId}. ${entity.questionTitle}`}</a>
      ),
    },
    {
      title: '资源信息',
      width: '15%',
      ellipsis: true,
      render: (dom, entity) => {
        return (
          <>
            <Tag icon={<IconFont type="icon-miaobiao" />}>{entity.judgeInfo.time} ms</Tag>
            <Tag icon={<IconFont type="icon-neicun" />}>{entity.judgeInfo.memory} MB</Tag>
          </>
        );
      },
    },
    {
      title: '评测状态',
      width: '32%',
      render: (dom, entity) => {
        const status = entity.status;
        const stepId = status > 2 ? 2 : status;
        let stepStatus: 'wait' | 'process' | 'finish' | 'error' = 'wait';
        let judgeResult: '已通过' | '未通过' | '等待中' = '等待中';
        switch (status) {
          case 0:
            stepStatus = 'wait';
            break;
          case 1:
            stepStatus = 'process';
            break;
          case 2:
            stepStatus = 'error';
            judgeResult = '未通过';
            break;
          case 3:
            stepStatus = 'finish';
            judgeResult = '已通过';
            break;
        }
        return (
          <>
            <Steps
              current={stepId}
              status={stepStatus}
              items={[
                {
                  title: '队列中',
                },
                {
                  title: '评测中',
                },
                {
                  title: judgeResult,
                },
              ]}
            />
          </>
        );
      },
    },
    {
      title: '提交时间',
      width: '12%',
      render: (dom, entity) => {
        return (
          <>{moment(new Date(entity.createTime).toISOString()).format('YYYY-MM-DD HH:mm:ss')}</>
        );
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: '8%',
      align: 'center',
      render: (dom, entity) => {
        return (
          <>
            <Tooltip placement="top" title="查看" color="#FA541C">
              <Button
                onClick={() => clickInspect(entity.id)}
                type="text"
                icon={<IconFont type="icon-chakan" />}
              ></Button>
            </Tooltip>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    reloadData();
  }, []);

  return (
    <div>
      <Card bodyStyle={{ padding: 0 }} style={{ borderRadius: 4 }}>
        <ProTable<QuestionSubmit.QuestionSubmit>
          loading={loading}
          dataSource={dataSource}
          columns={columns}
          rowKey="id"
          search={false}
          options={false}
          pagination={{
            total: total,
            current: pageNum,
            pageSize: 10,
            onChange: changePage,
          }}
          headerTitle="评测状态"
          toolBarRender={() => [
            <Button
              key="button"
              icon={<RedoOutlined />}
              onClick={reloadData}
              type="primary"
              loading={loading}
            >
              点击刷新
            </Button>,
          ]}
        />

        <ViewCodeModal visible={visible} targetId={targetId} onDone={onViewDone} />
      </Card>
    </div>
  );
};

export default SubmitStatus;
