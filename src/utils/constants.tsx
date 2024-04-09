import { CheckCircleOutlined, CloseCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

const BACKEND_DOMAIN: string = 'geektip.cc';
// 用于gitee登录
const CLIENT_ID: string = '8a4cc9702a22c7b8ebdf63a26a8744151a03787a0e56103babbd8446fc55a191';
export const BASE_URL: string = `https://oj.${BACKEND_DOMAIN}/api`;
const REDIRECT_URI: string = `${BASE_URL}/user/oauth2.0/gitee/success`;
export const GITEE_OAUTH_URL: string = `https://gitee.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const GuestUser: User.UserInfo = {
  uid: -1,
  username: '未登录',
  userRole: 'guest',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
};

// 定义允许 guest 访问的路径数组
export const GuestAllowedPaths = ['/question/list', '/status/list'];

export const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
};

export const Color = {
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
