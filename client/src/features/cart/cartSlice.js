import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotal: 0,
  isLoading: true,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemAlreadyExists = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (itemAlreadyExists) {
        itemAlreadyExists.quantity++;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    increment: (state, action) => {
      const item = state.cartItems.find((item) => item._id === action.payload);
      item.quantity++;
    },
    decrement: (state, action) => {
      const item = state.cartItems.find((item) => item._id === action.payload);
      if (item.quantity === 1) {
        const removeItem = state.cartItems.filter(
          (item) => item._id !== action.payload
        );
        state.cartItems = removeItem;
      } else {
        item.quantity--;
      }
    },
    remove: (state, action) => {
      const removeItem = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      state.cartItems = removeItem;
    },
    getTotal: (state) => {
      const cartTotal = state.cartItems.reduce(
        (total, current) => (total += current.productPrice * current.quantity),
        0
      );
      state.cartTotal = cartTotal;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartTotal = 0
    }
  },
});

export const { addToCart, increment, decrement, remove, getTotal, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
