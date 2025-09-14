import { UserDataType, ScoreDataType } from './dataTypes';

export type PuzzleStoreType = {
  answerStats: number[];
  setAnswerStats: (state: number[]) => void;
};

export type UserStoreType = {
  user: UserDataType;
  setUser: (state: UserDataType) => void;
};

export type ScoreStoreType = {
  scores: ScoreDataType[];
  setScores: (state: ScoreDataType[]) => void;
  addScoreData: (scoreData: ScoreDataType) => void;
};

// Checkbox : 앱 상태를 저장하는 상태 저장소
export type CheckboxType = {
  doneTutorial: boolean;
  testUser: boolean;
};

export type CheckboxStoreType = {
  checkbox: CheckboxType;
  setCheckbox: (state: CheckboxType) => void;
};
