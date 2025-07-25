import { LocalStorage } from './mmkvStorage';
import type { ScoreDataType, UserDataType } from '@/types/dataTypes';

export function getLocalUserData(): UserDataType | undefined {
  const dataString = LocalStorage.getString('userData');
  if (dataString) return JSON.parse(dataString) as UserDataType;
}

export function setLocalUserData(userData: UserDataType) {
  const dataString = JSON.stringify(userData);
  LocalStorage.set('userData', dataString);
}

export function getLocalScoreData(): ScoreDataType[] | undefined {
  const dataString = LocalStorage.getString('scoreData');
  if (dataString) return JSON.parse(dataString) as ScoreDataType[];
}

export function setLocalScoreData(scoreData: ScoreDataType[]) {
  const dataString = JSON.stringify(scoreData);
  LocalStorage.set('userData', dataString);
}
