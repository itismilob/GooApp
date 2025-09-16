import { CustomError } from '@/utils/customError';
import { Alert } from 'react-native';

/**에러 Alert를 띄움 */
export function showErrorAlert(error: CustomError) {
  Alert.alert(
    `${error.errorCode} - ${error.statusCode}\n${error.message}`,
    '개발자에게 문의해주세요.',
    [{ text: '확인' }],
  );
}
