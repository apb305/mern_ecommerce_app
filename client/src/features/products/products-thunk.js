import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../../config/axiosConfig";
import { auth } from "../../config/firebase";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (pageNumber) => {
    try {
      const response = await instance.post(
        `/api/products?pageNumber=${pageNumber}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProduct = createAsyncThunk("product/getProduct", async (id, {rejectWithValue}) => {
  try {
    const response = await instance.post(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    throw rejectWithValue(error.message)
  }
});

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (data, { getState }) => {
    const token = await auth.currentUser.getIdToken();
    const state = getState().auth;
    try {
      const response = await instance.post(
        `/api/products/add-product`,
        { uid: state.uid, data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Product added successfully");
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("An error has occured");
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (data, { getState }) => {
    const token = await auth.currentUser.getIdToken();
    const state = getState().auth;
    try {
      const response = await instance.put(
        `/api/products/edit-product`,
        { uid: state.uid, data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Product updated successfully");
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("An error has occured");
    }
  }
);
