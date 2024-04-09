import { request } from '@@/exports';

/** 创建题目（管理员） POST */
export async function createQuestion(body: Question.QuestionAdd, options?: { [key: string]: any }) {
  return request<API.R>('/oj/question/add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 更新题目（管理员） PUT */
export async function updateQuestion(
  body: Question.QuestionUpdate,
  options?: { [key: string]: any },
) {
  return request<API.R>('/oj/question', {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** 获取题目详情（管理员） GET */
export async function getQuestionVoById(id: number, options?: { [key: string]: any }) {
  return request<API.R>(`/oj/question/${id}/vo`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 删除题目（管理员） DELETE */
export async function deleteQuestion(id: number, options?: { [key: string]: any }) {
  return request<API.R>(`/oj/question/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 分页获取题目（管理员） POST */
export async function listQuestionVoByPage(
  body: Question.QuestionQuery,
  options?: { [key: string]: any },
) {
  return request<API.R>('/oj/question/page/vo', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 获取所有标签 GET */
export async function getQuestionTags(options?: { [key: string]: any }) {
  return request<API.R>(`/oj/question/tags`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 分页获取题目（普通用户） POST */
export async function listSafeQuestionVoByPage(
  body: Question.QuestionQuery,
  options?: { [key: string]: any },
) {
  return request<API.R>('/oj/question/page/vo/safe', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 获取题目详情（用户） GET */
export async function getSafeQuestionById(id: number, options?: { [key: string]: any }) {
  return request<API.R>(`/oj/question/${id}/vo/safe`, {
    method: 'GET',
    ...(options || {}),
  });
}
