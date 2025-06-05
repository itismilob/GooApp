export interface UserDataType {
  userID: string;
  nickname: string;
  rank: number;
}

export interface ScoreDataType {
  correct: number;
  wrong: number;
  accuracy: number;
  score: number;
  timestamp: Date;
}
