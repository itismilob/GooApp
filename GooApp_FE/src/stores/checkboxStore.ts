import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { localStorage } from './mmkvStorage';
import { CheckboxStoreType } from '@/types/storeTypes';

const checkboxLocalStore = create<CheckboxStoreType>()(
  persist(
    set => ({
      checkbox: { doneTutorial: false, testUser: false },
      setCheckbox: state => set({ checkbox: state }),
    }),
    {
      name: 'checkboxStore',
      storage: localStorage,
    },
  ),
);

export default checkboxLocalStore;
