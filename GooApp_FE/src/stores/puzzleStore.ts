import { PuzzleStoreType } from '@/types/storeTypes';
import { create } from 'zustand';

const puzzleStore = create<PuzzleStoreType>((set, get) => ({
  answerStats: [0, 0],
  getAnswerStats: () => get().answerStats,
  setAnswerStats: stats => set({ answerStats: stats }),
}));

export default puzzleStore;
