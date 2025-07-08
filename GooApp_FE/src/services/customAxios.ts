import axios from 'axios';
import { SERVER_URI } from '@env';
import { showErrorAlert } from '@/utils/alert';
import { CustomError } from '@/utils/customError';

export const customAxios = axios.create({
  baseURL: SERVER_URI,
  timeout: 1000,
});

function resErrorHandler(error: unknown) {
  let customError;

  if (axios.isAxiosError(error)) {
    // axios 에러일 때
    const status = error.response?.status || 500;
    const code = error.response?.data?.errorCode || 'UNKNOWN';
    const message = error.response?.data?.message || '알 수 없는 에러입니다.';

    customError = new CustomError(status, code, message);
  } else {
    // axios 에러가 아닐 때 기본 에러 반환
    customError = new CustomError(500, 'UNKNOWN', '알 수 없는 에러입니다.');
  }

  showErrorAlert(customError);
  return Promise.reject(customError);
}
customAxios.interceptors.response.use(res => res, resErrorHandler);
