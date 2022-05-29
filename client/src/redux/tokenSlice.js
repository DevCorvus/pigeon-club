import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (_, action) => action.payload,
    resetToken: () => initialState,
  },
});

export const { setToken, resetToken } = tokenSlice.actions;
export const getToken = (state) => state.token;

export default tokenSlice.reducer;
