import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer';

type StatusData = {
  [key: string]: { mean: number; count: number };
};

const initialState: StatusData = {};

const addStatusData = (
  state: WritableDraft<StatusData>,
  action: PayloadAction<{ key: string; time: number }>
) => {
  const { key, time } = action.payload;

  if (state[key]) {
    const data = state[key];

    // 평균 값 추가 (mean * count + ne      wValue) / (count + 1);
    data.mean = (data.mean * data.count + time) / (data.count + 1);
    data.count += 1;
  } else {
    state[key] = { mean: time, count: 1 };
  }
};

export const statusDataSlice = createSlice({
  name: 'statusData',
  initialState,
  reducers: {
    addStatusData,
  },
});

export const { addStatusData: addStatusDataAction } = statusDataSlice.actions;
export default statusDataSlice.reducer;
