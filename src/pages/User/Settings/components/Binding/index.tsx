import { IconFont } from '@/utils';
import { List, message } from 'antd';
import React, { Fragment } from 'react';

const BindingView: React.FC = () => {
  const getData = () => [
    {
      title: '绑定码云',
      description: '当前未绑定码云账号',
      actions: [
        <a onClick={() => message.warning('项目演示模式，该功能暂时禁用')} key="Bind">
          绑定
        </a>,
      ],
      avatar: <IconFont style={{ fontSize: 36 }} type="icon-gitee" />,
    },
  ];

  return (
    <Fragment>
      <List
        itemLayout="horizontal"
        dataSource={getData()}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta
              avatar={item.avatar}
              description={
                <>
                  <div style={{ fontWeight: 800, color: 'black' }}>{item.title}</div>
                  <div>{item.description}</div>
                </>
              }
            />
          </List.Item>
        )}
      />
    </Fragment>
  );
};

export default BindingView;
