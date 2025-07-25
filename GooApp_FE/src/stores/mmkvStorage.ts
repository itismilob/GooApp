import { MMKV } from 'react-native-mmkv';
import { MMKV_KEY } from '@env';

export const LocalStorage = new MMKV({
  id: 'GooApp_secure_store',
  encryptionKey: MMKV_KEY,
});
