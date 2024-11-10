import { configureStore } from '@reduxjs/toolkit';

import statusReducer from './statusSlice';
import inGameReducer from './inGameSlice';

const store = configureStore({
  reducer: {
    statusData: statusReducer,
    inGameData: inGameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;

export default store;
