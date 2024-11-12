import { GameData, InGameData } from '@/constants/Types';
import { WritableDraft } from 'immer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: InGameData = {
  totalQuiz: 0,
  gameDataList: [],
};

// reducers
const setTotalQuiz = (
  state: WritableDraft<InGameData>,
  action: PayloadAction<{ totalQuiz: number }>
) => {
  const { totalQuiz } = action.payload;
  state.totalQuiz = totalQuiz;
};

const setInGame = (
  state: WritableDraft<InGameData>,
  action: PayloadAction<{ gameDataList: GameData[] }>
) => {
  const { gameDataList } = action.payload;
  state.gameDataList = gameDataList;
};

export const inGameSlice = createSlice({
  name: 'inGameData',
  initialState,
  reducers: {
    setTotalQuiz,
    setInGame,
  },
});

export default inGameSlice.reducer;
export const { setTotalQuiz: setTotalQuizAction, setInGame: setInGameAction } =
  inGameSlice.actions;
