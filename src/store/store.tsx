// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import errorReducer from "./slices/errorSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    error: errorReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
