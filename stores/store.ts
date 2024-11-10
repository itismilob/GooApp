import { configureStore } from '@reduxjs/toolkit';

import statusDataSlice from './statusDataSlice';

const store = configureStore({
  reducer: {
    statusData: statusDataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;

export default store;
