import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../config/axiosConfig";
import { auth } from "../../config/firebase";

export const getReviews = createAsyncThunk("reviews/getReviews", async (productId, {rejectWithValue}) => {
  try {
    const response = await instance.post(`/api/reviews/${productId}`);
    return response.data;
  } catch (error) {
    throw rejectWithValue(error.message)
  }
});

export const addProductReview = createAsyncThunk(
  "reviews/addProductReview",
  async (review) => {
    const token = await auth.currentUser.getIdToken();
    try {
     const response = await instance.post(
        "/api/reviews",
        {
          data: review,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);
