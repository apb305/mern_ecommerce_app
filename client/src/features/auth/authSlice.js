import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: null,
  accessToken: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
        const { uid, token } = action.payload;
        state.uid = uid;
        state.accessToken = token;
      },
      logout: (state, action) => {
        state.uid = null;
        state.accessToken = null;
      }
  },
  extraReducers: {},
});

export const { setAuthUser, logout } = authSlice.actions;
export default authSlice.reducer;
