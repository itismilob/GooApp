export interface UserDataType {
  _id: string | undefined;
  nickname: string;
  tag: number;
  rank: number;
  topScore: number;
}

export interface ScoreDataType {
  correct: number;
  wrong: number;
  accuracy: number;
  score: number;
  timestamp: Date | undefined;
}
