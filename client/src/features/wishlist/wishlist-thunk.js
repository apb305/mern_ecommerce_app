import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../../config/axiosConfig";
import { auth } from "../../config/firebase";

export const getUserWishlist = createAsyncThunk(
  "wishlist/getUserWishlist",
  async (args, { getState }) => {
    const state = getState().auth;
    try {
      const token = await auth.currentUser.getIdToken();
      const response = await instance.post(
        "/wishlist",
        {
          uid: state.uid,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addToUserWishlist = createAsyncThunk(
  "wishlist/addToUserWishlist",
  async (product, { getState }) => {
    const state = getState().auth;
    const token = await auth.currentUser.getIdToken();
    try {
      const response = await instance.put(
        "/wishlist",
        {
          uid: state.uid,
          data: product,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeFromUserWishlist = createAsyncThunk(
  "wishlist/removeFromUserWishlist",
  async (wishListItemId, { getState }) => {
    const state = getState().auth;
    const token = await auth.currentUser.getIdToken();
    try {
      const response = await instance.delete("/wishlist", {
        data: {
          uid: state.uid,
          _id: wishListItemId,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Item removed from Wishlist");
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("Could not remove item from your Wishlist");
    }
  }
);
