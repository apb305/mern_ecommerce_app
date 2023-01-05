import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const { id } = payload;
      //Check if the item exists in the cart.
      const itemAlreadyExists = state.find((item) => item.id === id);
      if (itemAlreadyExists) {
        return state.map((item) => {
          if (item.id === itemAlreadyExists.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
      } else {
        state.push({
          ...payload,
          id: id,
          quantity: 1,
        });
      }
    },
    increment: (state, { payload }) => {
      return state.map((item) => {
        if (item.id === payload) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
    },
    decrement: (state, { payload }) => {
      let itemExist = state.find((item) => item.id === payload);
      //Remove item from cart.
      if (itemExist.quantity <= 1) {
        return state.filter((item) => item.id !== payload);
      }
      return state.map((item) => {
        if (item.id === payload) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
    },
    remove: (state, { payload }) => {
      return state.filter((item) => item.id !== payload);
    },
  },
});

export const { addToCart, increment, decrement, remove } = cartSlice.actions;

export default cartSlice.reducer;
