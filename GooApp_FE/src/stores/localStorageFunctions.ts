import { getLocalStorage } from './mmkvStorage';
import type { UserDataType } from '@/types/dataTypes';

export function getLocalUserData(): UserDataType | undefined {
  const localStorage = getLocalStorage();

  const userDataString = localStorage.getString('userData');
  if (userDataString) return JSON.parse(userDataString) as UserDataType;
}

export function setLocalUserData(userData: UserDataType) {
  const localStorage = getLocalStorage();

  const userDataString = JSON.stringify(userData);
  localStorage.set('userData', userDataString);
}
