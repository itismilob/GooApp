export type PuzzleStoreType = {
  answerStats: number[];
  getAnswerStats: () => number[];
  setAnswerStats: (stats: number[]) => void;
};
