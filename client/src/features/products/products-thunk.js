import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../config/axiosConfig";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const response = await instance.get("/api/products");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProduct = createAsyncThunk("product/getProduct", async (id) => {
  try {
    const response = await instance.get(`/api/products/product/${id}`);
    return response.data;
  } catch (error) {
    throw error
  }
});
