import { request } from '@@/exports';

/** 提交 POST */
export async function doAiAnalyse(
  body: AiAnalyse.AiAnalyseRequest,
  options?: { [key: string]: any },
) {
  return request<API.R>('/ai/analyse', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
