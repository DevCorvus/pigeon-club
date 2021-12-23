import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    setNickname: (state, action) => {
      state.nickname = action.payload;
    },
    resetUser: () => initialState
  }
});

export const { setUser, setNickname, resetUser } = userSlice.actions;
export const getUser = state => state.user;

export default userSlice.reducer;