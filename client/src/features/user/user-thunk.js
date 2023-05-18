import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../../config/axiosConfig";
import { auth } from "../../config/firebase";

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (args, { getState }) => {
    const state = getState().auth;
    try {
      const token = await auth.currentUser.getIdToken();
      const response = await instance.post(
        "/api/users",
        { uid: state.uid },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  "user/updateUserDetails",
  async (args, { getState }) => {
    const state = getState().auth;
    const { name, email } = args;
    try {
      const token = await auth.currentUser.getIdToken();
      const response = await instance.put(
        "/api/users",
        {
          uid: state.uid,
          name: name,
          email: email,
          //   phone: phone,
          //   bio: bio,
          //   photoURL: photoURL,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
