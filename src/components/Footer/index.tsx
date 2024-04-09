import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = 'Geek OJ';
  const currentYear = new Date().getFullYear();

  const whiteList: string[] = ['/question/*'];
  const flag = whiteList.some((item) => {
    const regex = new RegExp('^' + item.replace('*', '.*') + '$');
    return regex.test(history.location.pathname);
  });

  if (flag) {
    return null;
  }

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'gitee',
          title: (
            <span style={{ margin: '0 8px' }}>
              <GithubOutlined /> Bill Yu
            </span>
          ),
          href: 'https://github.com/yutianzeabc',
          blankTarget: true,
        },
        {
          key: 'beian',
          title: <span>浙ICP备2022000916号</span>,
          href: 'https://beian.miit.gov.cn/',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
