import { MMKV } from 'react-native-mmkv';
import { MMKV_KEY } from '@env';
import { createJSONStorage } from 'zustand/middleware';

export const mmkvStorage = new MMKV({
  id: 'GooApp_secure_store',
  encryptionKey: MMKV_KEY,
});

export const localStorage = createJSONStorage(() => ({
  setItem: (name, value) => {
    return mmkvStorage.set(name, value);
  },
  getItem: name => {
    const value = mmkvStorage.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    return mmkvStorage.delete(name);
  },
}));
