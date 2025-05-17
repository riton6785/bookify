import { createSlice } from "@reduxjs/toolkit";


const initialState: Cart[] = []
const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        addToCart: (state, action)=> {

        }
    }
})

export default cartReducer.reducer;
export const {addToCart} = cartReducer.actions;