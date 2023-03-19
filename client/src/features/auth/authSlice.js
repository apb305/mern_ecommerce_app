import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  name: null,
  uid: null,
  accessToken: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
        const { email, name, uid} = action.payload;
        state.email = email
        state.name = name
        state.uid = uid;
      },
      logout: (state, action) => {
        state.email = null
        state.name = null
        state.uid = null;
      }
  },
  extraReducers: {},
});

export const { setAuthUser, logout } = authSlice.actions;
export default authSlice.reducer;
