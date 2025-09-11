import { PuzzleStoreType } from '@/types/storeTypes';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { localStorage } from './mmkvStorage';

const puzzleLocalStore = create<PuzzleStoreType>()(
  persist(
    set => ({
      answerStats: [0, 0],
      setAnswerStats: state => set({ answerStats: state }),
    }),
    {
      name: 'localStorage',
      storage: localStorage,
    },
  ),
);

export default puzzleLocalStore;
