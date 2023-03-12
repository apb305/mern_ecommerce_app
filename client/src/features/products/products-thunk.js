import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../config/axiosConfig";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const response = await instance.post("/products");
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const getProduct = createAsyncThunk("product/getProduct", async (id) => {
  try {
    const response = await instance.post(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
});