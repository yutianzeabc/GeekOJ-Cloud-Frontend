export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' },
    ],
  },
  {
    path: '/user',
    access: 'canUser',
    routes: [{ name: '帐号设置', path: '/user/settings', component: './User/Settings' }],
  },
  {
    path: '/question/list',
    name: '题库',
    icon: 'profile',
    component: './Question/QuestionList',
  },
  {
    path: '/status/list',
    name: '评测状态',
    icon: 'barChart',
    component: './Status',
  },
  {
    path: '/question',
    access: 'canUser',
    routes: [
      {
        name: '题目详情',
        path: '/question/:id',
        component: './Question/QuestionDetail',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/admin/question',
    name: '题目管理',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin/AdminQuestion',
  },
  { path: '/', redirect: '/question/list' },
  { path: '*', layout: false, component: './404' },
];
