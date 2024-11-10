export type GameData = {
  quiz: number[];
  answer: number;
  correct: number;
  time: number;
};

export type InGameData = {
  totalQuiz: number;
  gameDataList: GameData[];
};

export type StatusData = {
  [key: string]: { mean: number; count: number };
};
