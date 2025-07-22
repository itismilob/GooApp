import { getLocalStorage } from './mmkvStorage';
import type { ScoreDataType, UserDataType } from '@/types/dataTypes';

export function getLocalUserData(): UserDataType | undefined {
  const localStorage = getLocalStorage();

  const dataString = localStorage.getString('userData');
  if (dataString) return JSON.parse(dataString) as UserDataType;
}

export function setLocalUserData(userData: UserDataType) {
  const localStorage = getLocalStorage();

  const dataString = JSON.stringify(userData);
  localStorage.set('userData', dataString);
}

export function getLocalScoreData(): ScoreDataType[] | undefined {
  const localStorage = getLocalStorage();

  const dataString = localStorage.getString('scoreData');
  if (dataString) return JSON.parse(dataString) as ScoreDataType[];
}

export function setLocalScoreData(scoreData: ScoreDataType[]) {
  const localStorage = getLocalStorage();

  const dataString = JSON.stringify(scoreData);
  localStorage.set('userData', dataString);
}
