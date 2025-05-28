import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice";
import cartReducer from "./cartslice";
import reviewReducer from "./review_slice"

export const store = configureStore({reducer: {
    userReducer: userReducer,
    cartReducer: cartReducer,
    reviewReducer: reviewReducer,
}})