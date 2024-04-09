import { request } from '@@/exports';

/** 提交 POST */
export async function doQuestionSubmit(
  body: QuestionSubmit.QuestionSubmitAdd,
  options?: { [key: string]: any },
) {
  return request<API.R>('/oj/question_submit', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 查看所有的提交记录 POST */
export async function listAllQuestionSubmitVoByPage(
  body: QuestionSubmit.QuestionSubmitQuery,
  options?: { [key: string]: any },
) {
  return request<API.R>('/oj/question_submit/page/vo', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 查看自己的提交记录 POST */
export async function listMyQuestionSubmitVoByPage(
  body: QuestionSubmit.QuestionSubmitQuery,
  options?: { [key: string]: any },
) {
  return request<API.R>('/oj/question_submit/page/vo/my', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 获取某次提交的详细信息 GET */
export async function getQuestionSubmitVoById(id: number, options?: { [key: string]: any }) {
  return request<API.R>(`/oj/question_submit/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取摘要信息 GET */
export async function getSubmitSummary(options?: { [key: string]: any }) {
  return request<API.R>(`/oj/question_submit/summary`, {
    method: 'GET',
    ...(options || {}),
  });
}
