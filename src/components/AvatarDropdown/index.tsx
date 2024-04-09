import { outLogin } from '@/services/user/api';
import { GuestUser, UserRole } from '@/utils/constants';
import { KeyOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useModel } from '@umijs/max';
import { Col, Modal, Row, Spin, Typography } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback, useState } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return <span className="anticon">{currentUser?.username}</span>;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ children }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { Paragraph } = Typography;

  /**
   * 退出登录
   */
  const loginOut = async () => {
    history.push('/');
    flushSync(() => {
      setInitialState((s) => ({ ...s, currentUser: GuestUser }));
    });
    await outLogin();
  };

  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      switch (key) {
        case 'login':
          history.push('/user/login');
          break;
        case 'register':
          history.push('/user/register');
          break;
        case 'settings':
          history.push('/user/settings');
          break;
        case 'logout':
          loginOut();
          break;
        case 'AK/SK':
          setModalVisible(true);
          break;
      }
    },
    [setInitialState],
  );

  const loading = (
    <span className={actionClassName}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser) {
    return loading;
  }

  const menuItems =
    currentUser.userRole !== UserRole.GUEST
      ? [
          {
            key: 'settings',
            icon: <UserOutlined />,
            label: '个人中心',
          },
          {
            key: 'AK/SK',
            icon: <KeyOutlined />,
            label: 'API 密钥',
          },
          {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: '退出',
          },
        ]
      : [
          {
            key: 'login',
            icon: <UserOutlined />,
            label: '登录',
          },
          {
            key: 'register',
            icon: <SettingOutlined />,
            label: '注册',
          },
        ];

  return (
    <>
      <HeaderDropdown
        menu={{
          selectedKeys: [],
          onClick: onMenuClick,
          items: menuItems,
        }}
      >
        {children}
      </HeaderDropdown>

      <Modal open={modalVisible} onCancel={() => setModalVisible(false)} footer={null}>
        <Row style={{ padding: '6px 0' }}>
          <Col style={{ color: 'rgba(0,0,0,.4)' }} flex="80px">
            AccessKey
          </Col>
          <Col flex="auto">
            <Paragraph style={{ color: 'rgba(0,0,0,.9)' }} copyable>
              {currentUser?.accessKey}
            </Paragraph>
          </Col>
        </Row>

        <Row style={{ padding: '6px 0' }}>
          <Col style={{ color: 'rgba(0,0,0,.4)' }} flex="80px">
            SecretKey
          </Col>
          <Col flex="auto">
            <Paragraph style={{ color: 'rgba(0,0,0,.9)' }} copyable>
              {currentUser?.secretKey}
            </Paragraph>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
