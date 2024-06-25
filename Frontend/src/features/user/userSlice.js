import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  signupStatus: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSignupStatus: (state, action) => {
      state.signupStatus = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.signupStatus = null;
    },
  },
});

export const { setUser, setSignupStatus, clearUser } = userSlice.actions;

export const selectUser = (state) => state.user.user; // Selector to access user data
export const selectSignupStatus = (state) => state.user.signupStatus; // Selector to access signup status

export default userSlice.reducer;
