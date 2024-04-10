import { request } from '@@/exports';

/** 获取当前的用户 GET */
export async function getCurrentUser(options?: { [key: string]: any }) {
  return request<{
    data: User.UserInfo;
  }>('/user/info', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 根据UID获取用户 GET */
export async function getUserByUid(uid: number, options?: { [key: string]: any }) {
  return request<API.R>(`/user/info/${uid}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录接口（账号密码登录） POST */
export async function login(body: User.LoginParams, options?: { [key: string]: any }) {
  return request<API.R>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 下线接口 POST */
export async function outLogin(options?: { [key: string]: any }) {
  return request<API.R>('/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 注册接口（邮箱密码注册） POST */
export async function register(body: User.RegisterParams, options?: { [key: string]: any }) {
  return request<API.R>('/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function loginByPhone(body: User.PhoneLoginParams, options?: { [key: string]: any }) {
  return request<API.R>('/user/loginByPhone', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getPhoneCaptcha(
  params: User.PhoneCaptchaParams,
  options?: { [key: string]: any },
) {
  return request<API.R>('/user/sms/sendCode', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function getEmailCaptcha(
  params: User.EmailCaptchaParams,
  options?: { [key: string]: any },
) {
  return request<API.R>('/user/email/sendCode', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function getAllTags(options?: { [key: string]: any }) {
  return request<API.R>('/user/tags', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function addATag(body: User.UserTagAddRequest, options?: { [key: string]: any }) {
  return request<API.R>('/user/tags/add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function updateBasic(body: User.UpdateBasicParams, options?: { [key: string]: any }) {
  return request<API.R>('/user/update', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function updatePwd(params: User.UpdatePwdParams, options?: { [key: string]: any }) {
  return request<API.R>('/user/pwd', {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

export async function bindPhone(params: User.BindPhoneParams, options?: { [key: string]: any }) {
  return request<API.R>('/user/phone', {
    method: 'PUT',
    params: params,
    ...(options || {}),
  });
}

export async function bindEmail(params: User.BindEmailParams, options?: { [key: string]: any }) {
  return request<API.R>('/user/email', {
    method: 'PUT',
    params: params,
    ...(options || {}),
  });
}

// /**
//  * 关注用户
//  */
// export async function follow(uid: number, options?: { [key: string]: any }) {
//   return request<API.R>(`/user/follow/${uid}`, {
//     method: 'POST',
//     ...(options || {}),
//   });
// }
//
// /**
//  * 获取关注列表
//  */
// export async function getFollowsOfCurrent(options?: { [key: string]: any }) {
//   return request<API.R>(`/user/follows/of/current`, {
//     method: 'GET',
//     ...(options || {}),
//   });
// }
//
// /**
//  * 获取关注列表
//  */
// export async function getFollowsByUid(uid: number, options?: { [key: string]: any }) {
//   return request<API.R>(`/user/follows/of/${uid}`, {
//     method: 'GET',
//     ...(options || {}),
//   });
// }
//
// /**
//  * 获取粉丝列表
//  */
// export async function getFansByUid(uid: number, options?: { [key: string]: any }) {
//   return request<API.R>(`/user/fans/of/${uid}`, {
//     method: 'GET',
//     ...(options || {}),
//   });
// }
