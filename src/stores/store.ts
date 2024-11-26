import { configureStore } from '@reduxjs/toolkit';

import statusReducer from './statusSlice';
import inGameReducer from './inGameSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    statusData: statusReducer,
    inGameData: inGameReducer,
    userData: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
