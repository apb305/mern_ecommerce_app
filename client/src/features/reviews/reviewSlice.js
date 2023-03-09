import { createSlice } from "@reduxjs/toolkit";
import { getReviews, addProductReview } from "./review-thunk"

const initialState = {
  productReviews: [],
  product: {},
  isLoading: true,
};

export const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getReviews.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getReviews.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productReviews = action.payload.reviews;
      state.product = action.payload.product
    });
    builder.addCase(getReviews.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addProductReview.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addProductReview.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productReviews = action.payload;
    });
    builder.addCase(addProductReview.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default reviewSlice.reducer;