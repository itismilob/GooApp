import { userData } from '@/constants/Types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer';

const initialState: userData = {};

const setUser = (
  state: WritableDraft<userData>,
  action: PayloadAction<{ username: string }>
) => {
  const { username } = action.payload;
  state.username = username;
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUser,
  },
});

export const { setUser: setUserAction } = userSlice.actions;
export default userSlice.reducer;
