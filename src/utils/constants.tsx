import { CheckCircleOutlined, CloseCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

// 从UMI define中获取全局变量
declare global {
  const BACKEND_URL: string;
  const GITEE_CLIENT_ID: string;
}
// Gitee OAuth
const GITEE_REDIRECT_URI: string = `${BACKEND_URL}/user/oauth2.0/gitee/success`;
export const GITEE_OAUTH_URL: string = `https://gitee.com/oauth/authorize?client_id=${GITEE_CLIENT_ID}&redirect_uri=${GITEE_REDIRECT_URI}&response_type=code`;

export const GuestUser: User.UserInfo = {
  uid: -1,
  username: '未登录',
  userRole: 'guest',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
};

export const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
};

export const Color = {
  UNKNOWN: '#4096ff',
  EASY: '#00AF9B',
  MEDIUM: '#FFB800',
  HARD: '#FF2D55',
};

//Content页面
export const questionStatusColor = new Map<string, string>([
  ['已通过', Color.EASY],
  ['尝试过', Color.MEDIUM],
  ['未开始', Color.HARD],
]);
export const questionStatusIcon = new Map<string, any>([
  ['已通过', <CheckCircleOutlined key="passed" />],
  ['尝试过', <CloseCircleOutlined key="tried" />],
  ['未开始', <MinusCircleOutlined key="noLog" />],
]);

//LogDetail页面
export const submitStatusText = new Map<number, string>([
  [3, '通过'],
  [2, '解答错误'],
  [1, '判题中'],
  [0, '等待中'],
]);

export const languageLabel = new Map<string, string>([
  ['java', 'Java'],
  ['cpp', 'C++'],
  ['go', 'Golang'],
]);

export const submitStatusColor = new Map<number, string>([
  [3, Color.EASY],
  [2, Color.HARD],
  [1, Color.MEDIUM],
  [0, Color.MEDIUM],
]);

export const submitStatusIcon = new Map<number, any>([
  [3, <CheckCircleOutlined key="passed" />],
  [2, <CloseCircleOutlined key="tried" />],
  [1, <MinusCircleOutlined key="noLog" />],
  [0, <MinusCircleOutlined key="noLog" />],
]);

export const SUBMIT_STATUS = {
  WAITING: 0,
  RUNNING: 1,
  FAILED: 2,
  SUCCEED: 3,
};

export const JUDGE_INFO_STATUS = {
  ACCEPTED: 'Accepted',
  WRONG_ANSWER: 'Wrong Answer',
  COMPILE_ERROR: 'Compile Error',
  MEMORY_LIMIT_EXCEEDED: 'Out of Memory',
  TIME_LIMIT_EXCEEDED: 'Time Limit Exceeded',
  PRESENTATION_ERROR: 'Presentation Error',
  WAITING: 'Waiting',
  OUTPUT_LIMIT_EXCEEDED: 'Output Limit Exceeded',
  DANGEROUS_OPERATION: 'Dangerous Operation',
  RUNTIME_ERROR: 'Runtime Error',
  SYSTEM_ERROR: 'System Error',
};

export const CODE_TEMPLATE = new Map<string, string>([
  [
    'java',
    'import java.util.*;\r\n\r\nclass Main {\r\n    public static void main(String[] args) {\r\n        // 此处开始作答\r\n        \r\n    }\r\n}',
  ],
  [
    'cpp',
    '#include <bits/stdc++.h>\r\nusing namespace std;\r\n\r\nint main () {\r\n    // 此处开始作答\r\n    \r\n}',
  ],
  [
    'go',
    'package main\r\n\r\nimport "fmt"\r\n\r\nfunc main() {\r\n    // 此处开始作答\r\n    \r\n}',
  ],
]);
