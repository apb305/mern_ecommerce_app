import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  uid: "",
  isAuthUser: false
};

const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
        const { email, uid, isAuthUser} = action.payload;
        state.email = email
        state.uid = uid;
        state.isAuthUser = isAuthUser
      },
      logout: (state, action) => {
        state.email = ""
        state.uid = "";
        state.isAuthUser = false
      }
  },
  extraReducers: {},
});

export const { setAuthUser, logout } = authSlice.actions;
export default authSlice.reducer;
