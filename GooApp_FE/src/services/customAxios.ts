import axios from 'axios';
import { SERVER_URI } from '@env';
import { showErrorAlert } from '@/utils/alert';
import { CustomError } from '@/utils/customError';
import { Alert } from 'react-native';

/**axios instance 생성 */
export const customAxios = axios.create({
  baseURL: SERVER_URI,
  timeout: 1000,
});

/**응답 에러 처리 */
function resErrorHandler(error: unknown) {
  let status = 500;
  let code = 'UNKNOWN';
  let message = '알 수 없는 에러입니다.';

  // axios 에러일 때
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      status = 503;
      code = 'NETWORK_ERROR';
      message = '네트워크 오류가 발생했습니다.';
    } else if (error.code === 'ECONNABORTED') {
      status = 408;
      code = 'TIMEOUT';
      message = '요청 시간이 초과되었습니다.';
    } else {
      status = error.response.status;
      code = error.response.data.errorCode;
      message = error.response.data.message;
    }
  }

  const customError = new CustomError(status, code, message);

  // showErrorAlert(customError);
  return Promise.reject(customError);
}

customAxios.interceptors.response.use(res => res, resErrorHandler);

// 디버그용
customAxios.interceptors.request.use(
  req => {
    console.log(req);
    // Alert.alert(`${req.method}`, `${req.baseURL}/${req.url}`, [
    //   { text: '확인' },
    // ]);
    return req;
  },
  error => error,
);
