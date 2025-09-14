import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { localStorage } from './mmkvStorage';
import { ScoreStoreType } from '@/types/storeTypes';

const scoreLocalStore = create<ScoreStoreType>()(
  persist(
    set => ({
      scores: [],
      setScores: state => set({ scores: state }),
      addScoreData: newScore =>
        set(state => ({ scores: [...state.scores, newScore] })),
    }),
    {
      name: 'scoreStore',
      storage: localStorage,
    },
  ),
);

export default scoreLocalStore;
