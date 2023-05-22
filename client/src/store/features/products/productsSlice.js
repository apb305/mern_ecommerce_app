import { createSlice } from "@reduxjs/toolkit";
import {getProduct, getProducts, addProduct } from "./products-thunk"

const initialState = {
  products: [],
  product: {},
  isLoading: true,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload.products;
      state.pages = action.payload.pages;
      state.page = action.payload.page;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload.product;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.product = action.payload.product;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { setProduct } = productsSlice.actions;
export default productsSlice.reducer;
