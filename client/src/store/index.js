import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../store/features/cart/cartSlice";
import productsReducer from "../store/features/products/productsSlice";
import userReducer from "../store/features/user/userSlice";
import authReducer from "../store/features/auth/authSlice";
import reviewReducer from "../store/features/reviews/reviewSlice";
import wishlistReducer from "../store/features/wishlist/wishlistSlice";
import storage from "redux-persist/lib/storage";
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
  reviews: reviewReducer,
  auth: authReducer,
  user: userReducer,
  wishlist: wishlistReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["wishlist", "reviews"],
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
