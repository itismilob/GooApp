import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { localStorage } from './mmkvStorage';
import { UserStoreType } from '@/types/storeTypes';

const userLocalStore = create<UserStoreType>()(
  persist(
    set => ({
      user: { _id: undefined, nickname: '', tag: 0, rank: 0, topScore: 0 },
      setUser: state => set({ user: state }),
    }),
    {
      name: 'userStore',
      storage: localStorage,
    },
  ),
);

export default userLocalStore;
