// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uid: '',
  _id: '',
  userDetails: {},
  signupStatus: null,
  phoneNumber: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.uid = action.payload.uid;
      state._id = action.payload._id;
      state.userDetails = action.payload.userDetails;
      state.phoneNumber = action.payload.phoneNumber;
    },
    setSignupStatus: (state, action) => {
      state.signupStatus = action.payload;
    },
    clearUser: (state) => {
      state.uid = '';
      state._id = '';
      state.userDetails = {};
      state.signupStatus = null;
      state.phoneNumber = '';
    },
  },
});

export const { setUser, setSignupStatus, clearUser } = userSlice.actions;

export const selectUser = (state) => state.user;
export const selectSignupStatus = (state) => state.user.signupStatus;

export default userSlice.reducer;
