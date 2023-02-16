import { createSlice } from "@reduxjs/toolkit";
import { getUserDetails, updateUserDetails } from "./user-thunk";

const initialState = {
  userDetails: {},
  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userDetails = action.payload;
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateUserDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userDetails = action.payload;
    });
    builder.addCase(updateUserDetails.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;
