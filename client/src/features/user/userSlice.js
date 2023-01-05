// import { async } from "@firebase/util";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
// import { db } from "../../config/firebase";

// export const getUserWishlist = createAsyncThunk(
//   "wishlist/getUserWishlist",
//   async (id) => {
//     try {
//       const docRef = doc(db, "users", id);
//       const querySnapshot = await getDoc(docRef);
//       return querySnapshot.data().favorites;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// export const addToUserWishlist = createAsyncThunk(
//   "wishlist/addToUserWishlist",
//   async (item) => {
//     try {
//       const { product, id } = item;
//       const userRef = doc(db, "users", id);
//       await updateDoc(userRef, {
//         favorites: arrayUnion(product),
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// export const removeFromUserWishlist = createAsyncThunk(
//   "wishlist/removeFromUserWishlist",
//   async (item) => {
//     try {
//       const { product, id } = item;
//       const userRef = doc(db, "users", id)
//       await updateDoc(userRef, {
//         favorites: arrayRemove(product)
//       })
//     } catch (error) {
//       console.log(error)
//     }
//   }
// )

// const initialState = {
//   user: null,
//   wishlist: [],
//   isLoading: true,
//   isLoggedIn: false,
// };

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     login: (state, { payload }) => {
//       state.user = payload;
//       state.isLoggedIn = true;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.wishlist = null;
//       state.isLoggedIn = false;
//     },
//     loading: (state, { payload }) => {
//       state.isLoading = payload;
//     },
//   },
//   extraReducers: {
//     [getUserWishlist.pending]: (state) => {
//       state.isLoading = true;
//     },
//     [getUserWishlist.fulfilled]: (state, { payload }) => {
//       state.wishlist = payload;
//       state.isLoading = false;
//     },
//     [getUserWishlist.rejected]: (state) => {
//       state.status = "failed";
//     },
//     [addToUserWishlist.pending]: (state) => {
//       state.isLoading = true;
//     },
//     [addToUserWishlist.fulfilled]: (state) => {
//       state.isLoading = false;
//     },
//     [addToUserWishlist.rejected]: (state) => {
//       state.status = "failed";
//     },
//     [removeFromUserWishlist.pending]: (state) => {
//       state.isLoading = true;
//     },
//     [removeFromUserWishlist.fulfilled]: (state) => {
//       state.isLoading = false;
//     },
//     [removeFromUserWishlist.rejected]: (state) => {
//       state.status = "failed";
//     }
//   },
// });

// export const { login, logout, loading, setWishlist } = userSlice.actions;

// export default userSlice.reducer;
