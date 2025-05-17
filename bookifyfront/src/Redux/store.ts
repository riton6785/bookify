import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice";
import cartReducer from "./cartslice";

export const store = configureStore({reducer: {
    userReducer: userReducer,
    cartReducer: cartReducer,
}})