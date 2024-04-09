import { request } from '@@/exports';

/** 提交 POST */
export async function doQuestionRun(
  body: QuestionRun.QuestionRunRequest,
  options?: { [key: string]: any },
) {
  return request<API.R>('/judge/run', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
