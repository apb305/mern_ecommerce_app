import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: null,
  isAuthUser: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
        const { uid, isAuthUser} = action.payload;
        state.uid = uid;
        state.isAuthUser = isAuthUser
      }
  },
  extraReducers: {},
});

export const { setAuthUser } = authSlice.actions;
export default authSlice.reducer;
