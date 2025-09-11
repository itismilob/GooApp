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
