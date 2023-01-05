// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { collection, getDocs, doc, getDoc } from "firebase/firestore";
// import { db } from "../../config/firebase";

// export const getProducts = createAsyncThunk(
//   "products/getProducts",
//   async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "products"));
//       let products = [];
//       querySnapshot.forEach((doc) => {
//         // console.log(doc.data());
//         products.push({
//           ...doc.data(),
//           id: doc.id,
//         });
//       });
//       return products;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// export const getProduct = createAsyncThunk("product/getProduct", async (id) => {
//   try {
//     const docRef = doc(db, "products", id);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       let product = { ...docSnap.data(), id: docSnap.id };
//       return product;
//     } 
//   } catch (error) {
//     console.log(error);
//   }
// });

// // import products from "../../data/dummyData";

// const initialState = {
//   products: [],
//   product: {},
//   isLoading: true,
// };

// export const productsSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     setProduct: (state, { payload }) => {
//       state.product = payload
//   },},
//   extraReducers: {
//     [getProducts.pending]: (state, action) => {
//       state.isLoading = true;
//     },
//     [getProducts.fulfilled]: (state, { payload }) => {
//       state.products = payload;
//       state.isLoading = false;
//     },
//     [getProducts.rejected]: (state, action) => {
//       state.status = "failed";
//     },
//     [getProduct.pending]: (state, action) => {
//       state.isLoading = true;
//     },
//     [getProduct.fulfilled]: (state, { payload }) => {
//       state.product = payload;
//       state.isLoading = false;
//     },
//     [getProduct.rejected]: (state, action) => {
//       state.status = "failed";
//     },
//   },
// });

// export const { setProduct } = productsSlice.actions;
// export default productsSlice.reducer;
