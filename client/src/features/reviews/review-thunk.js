import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../config/axiosConfig";
import { auth } from "../../config/firebase";
const headers = {
  'Content-Type': 'application/json'
};

export const getReviews = createAsyncThunk("reviews/getReviews", async (productId) => {
  try {
    const response = await instance.get(`/reviews/${productId}`, {headers});
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
});

export const addProductReview = createAsyncThunk(
  "reviews/addProductReview",
  async (review) => {
    const token = await auth.currentUser.getIdToken();
    try {
     const response = await instance.post(
        "/reviews",
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
