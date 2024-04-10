import { getQuestionTags, listSafeQuestionVoByPage } from '@/services/question/api';
import { IconFont } from '@/utils';
import { Color, UserRole } from '@/utils/constants';
import { history, useModel, useNavigate, useSearchParams } from '@@/exports';
import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  TagsOutlined,
} from '@ant-design/icons';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Card, Col, Row, Select, Space, Tag, Tooltip } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react';

const SafeQuestionTable: React.FC = () => {
  const navigate = useNavigate();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [urlSearchParams] = useSearchParams();
  const [dataSource, setDataSource] = useState<Question.SafeQuestion[]>([]);
  const [options, setOptions] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  //搜索参数
  const [questionStatus, setQuestionStatus] = useState<string>(() => {
    return urlSearchParams.get('status') || '全部';
  });
  const [pageNum, setPageNum] = useState(() => {
    return Number(urlSearchParams.get('pageNum')) || 1;
  });
  const [difficulty, setDifficulty] = useState<string>(() => {
    return urlSearchParams.get('difficulty') || '全部';
  });
  const [keyword, setKeyword] = useState<string>(() => {
    return urlSearchParams.get('keyword') || '';
  });
  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    return urlSearchParams.getAll('tags') || [];
  });

  //重新获取数据
  const reloadData = () => {
    setLoading(true);
    listSafeQuestionVoByPage({
      pageNum,
      keyword: keyword,
      status: questionStatus,
      difficulty: difficulty === '全部' ? '' : difficulty,
      tags: selectedTags,
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
  const updateQueryParam = (
    pageNum: number,
    status: string,
    difficulty: string,
    keyword: string,
    selectedTags: string[],
  ) => {
    const params = new URLSearchParams({
      pageNum: pageNum.toString(),
      status,
      difficulty,
      keyword: keyword,
    });
    selectedTags.forEach((tag) => params.append('tags', tag));
    //将搜索参数拼接到query上
    navigate({
      search: `?${params.toString()}`,
    });
  };
  const changePage = (page: number) => {
    setPageNum(page);
    updateQueryParam(page, questionStatus, difficulty, keyword, selectedTags);
  };
  const changeStatus = (newStatus: string) => {
    setQuestionStatus(newStatus);
    updateQueryParam(pageNum, newStatus, difficulty, keyword, selectedTags);
  };
  const changeDifficulty = (newDifficulty: string) => {
    setDifficulty(newDifficulty);
    updateQueryParam(pageNum, questionStatus, newDifficulty, keyword, selectedTags);
  };
  const onSearch = (value: string) => {
    setKeyword(value);
    updateQueryParam(pageNum, questionStatus, difficulty, value, selectedTags);
  };
  const handleTagClose = (removeTag: string) => {
    const update = selectedTags.filter((tag) => tag !== removeTag);
    setSelectedTags(update);
    updateQueryParam(pageNum, questionStatus, difficulty, keyword, update);
  };
  const addTagToParam = (addTag: string) => {
    const update = [...selectedTags, addTag];
    setSelectedTags(update);
    updateQueryParam(pageNum, questionStatus, difficulty, keyword, update);
  };

  //针对题目的操作
  const clickInspect = (id: number) => {
    if (!currentUser || currentUser.userRole === UserRole.GUEST) {
      history.push(`/user/login?redirect=/question/${id}`);
      return;
    }
    history.push(`/question/${id}`);
  };

  //有关标签搜索的内容
  //初始化获取标签信息
  useEffect(() => {
    getQuestionTags().then((res) => {
      if (res.code === 200) {
        setOptions(res.data);
      }
    });
  }, []);

  const columns: ProColumns<Question.SafeQuestion>[] = [
    {
      title: '状态',
      width: '5%',
      align: 'center',
      render: (_, question) => (
        <>
          {(question.status === '尝试过' && (
            <CloseCircleOutlined style={{ fontSize: 18, color: Color.MEDIUM }} />
          )) ||
            (question.status === '已通过' && (
              <CheckCircleOutlined style={{ fontSize: 18, color: Color.EASY }} />
            ))}
        </>
      ),
    },
    {
      title: '题目',
      width: '20%',
      ellipsis: true,
      render: (_, question) => <>{`${question.id}. ${question.title}`}</>,
    },
    {
      title: '标签',
      ellipsis: true,
      width: '20%',
      render: (_, record) => (
        <Space>
          {record.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '通过率',
      width: '10%',
      align: 'center',
      render: (dom, entity) => {
        return <>{((entity.acceptedNum / entity.submitNum || 0) * 100).toFixed(2)}%</>;
      },
    },
    {
      title: '难度',
      width: '5%',
      align: 'center',
      render: (_, entity) => {
        return (
          <>
            {(entity.difficulty === '简单' && (
              <span style={{ marginRight: 0, color: Color.EASY }}>简单</span>
            )) ||
              (entity.difficulty === '中等' && (
                <span style={{ marginRight: 0, color: Color.MEDIUM }}>中等</span>
              )) ||
              (entity.difficulty === '困难' && (
                <span style={{ marginRight: 0, color: Color.HARD }}>困难</span>
              ))}
          </>
        );
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: '5%',
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

  return (
    <Card bodyStyle={{ padding: 0 }} style={{ borderRadius: 4 }}>
      <Row style={{ padding: '24px 24px 16px 24px' }}>
        <Col flex="150px">
          状态：
          <Select
            value={questionStatus}
            style={{ width: 90 }}
            onChange={changeStatus}
            options={[
              { value: '全部', label: '全部' },
              { value: '未开始', label: '未开始' },
              { value: '尝试过', label: '尝试过' },
              { value: '已通过', label: '已通过' },
            ]}
          />
        </Col>

        <Col flex="140px">
          难度：
          <Select
            value={difficulty}
            style={{ width: 80 }}
            onChange={changeDifficulty}
            options={[
              { value: '全部', label: '全部' },
              { value: '简单', label: '简单' },
              { value: '中等', label: '中等' },
              { value: '困难', label: '困难' },
            ]}
          />
        </Col>

        <Col flex="auto">
          <Row justify="space-around" align="middle">
            <Col flex="66px">
              <div style={{ fontSize: 14 }}>
                <TagsOutlined />
                <span style={{ marginLeft: 8 }}>标签：</span>
              </div>
            </Col>
            <Col flex="auto">
              <Select
                mode="multiple"
                showSearch={false}
                value={selectedTags}
                style={{ width: '90%' }}
                dropdownStyle={{ padding: 12 }}
                tagRender={(tag) => {
                  return (
                    <Tag
                      closable={true}
                      onClose={() => {
                        handleTagClose(tag.value);
                      }}
                      style={{ marginRight: 3 }}
                    >
                      {tag.value}
                    </Tag>
                  );
                }}
                dropdownRender={() => (
                  <div>
                    {options.map((option) =>
                      selectedTags?.includes(option) ? (
                        <Tag
                          onClick={() => handleTagClose(option)}
                          style={{ cursor: 'pointer' }}
                          color="#f50"
                          key={option}
                        >
                          {option}
                          <CheckOutlined />
                        </Tag>
                      ) : (
                        <Tag
                          onClick={() => addTagToParam(option)}
                          style={{ cursor: 'pointer' }}
                          key={option}
                        >
                          {option}
                        </Tag>
                      ),
                    )}
                  </div>
                )}
              />
            </Col>
          </Row>
        </Col>

        <Col flex="200px" style={{ float: 'right' }}>
          <Search placeholder="输入搜索关键词" allowClear onSearch={onSearch} />
        </Col>
      </Row>

      <ProTable<Question.SafeQuestion>
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
      />
    </Card>
  );
};

export default SafeQuestionTable;
