import { MMKV } from 'react-native-mmkv';
import { MMKV_KEY } from '@env';

let LocalStorage: MMKV;

export function createLocalStorage() {
  const KEY = MMKV_KEY;

  LocalStorage = new MMKV({
    id: 'GooApp_secure_store',
    encryptionKey: KEY,
  });
}

export function getLocalStorage(): MMKV {
  if (!LocalStorage) {
    createLocalStorage();
  }
  return LocalStorage;
}
