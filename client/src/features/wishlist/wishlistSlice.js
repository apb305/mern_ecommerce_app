import { createSlice } from "@reduxjs/toolkit";
import { getUserWishlist, removeFromUserWishlist, addToUserWishlist } from "./wishlist-thunk";

const initialState = {
  wishlist: [],
  isLoading: true
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUserWishlist.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserWishlist.fulfilled, (state, action) => {
      state.isLoading = false;
      state.wishlist = action.payload
    });
    builder.addCase(getUserWishlist.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addToUserWishlist.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addToUserWishlist.fulfilled, (state, action) => {
      state.isLoading = false;
      state.wishlist = action.payload
    });
    builder.addCase(addToUserWishlist.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(removeFromUserWishlist.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeFromUserWishlist.fulfilled, (state, action) => {
      state.isLoading = false;
      state.wishlist = state.wishlist.filter((item) => item._id !== action.meta.arg)
    });
    builder.addCase(removeFromUserWishlist.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default wishlistSlice.reducer;
