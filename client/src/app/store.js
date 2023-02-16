import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productsReducer from "../features/products/productsSlice";
import userReducer from "../features/user/userSlice";
import authReducer from "../features/auth/authSlice"
import storage from "redux-persist/lib/storage";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import { combineReducers } from "@reduxjs/toolkit";
// import persistStore from "redux-persist/es/persistStore";
// import persistReducer from "redux-persist/es/persistReducer";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  auth: authReducer,
  user: userReducer,
  wishlist: wishlistReducer
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ['products', 'wishlist', 'user' ]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const presistor = persistStore(store);
export default store;
