import { createSlice } from "@reduxjs/toolkit";


const initialState: CartState = {
    cart: [],
    wishlist: [],
}
const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        addToCart: (state, action)=> {
            for (const item of action.payload) {
                const itemId = item.product._id;
                const existingItem = state.cart.find((item)=> item.product._id === itemId);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    state.cart.push({
                        product: item.product,
                        quantity: item.quantity
                    })
                }
            }
        },

        removeFromCart: (state, action) => {
            const itemId = action.payload.product._id;
            const existingItem = state.cart.find((item)=> item.product._id === itemId);
            if (existingItem) {
                if (existingItem.quantity === action.payload.quantity) {
                    state.cart = state.cart.filter((item)=> item.product._id !== itemId);
                } else {
                    existingItem.quantity -= action.payload.quantity;
                }
            }
        },
        toggleWishList: (state, action)=> {
            const isItemInWishlist = state.wishlist.find((item)=> item.id === action.payload);
            if (isItemInWishlist) {
                state.wishlist = state.wishlist.filter((item)=> item.id !== action.payload)
            } else {
                state.wishlist.push({
                    id: action.payload
                })
            }
        }
    }
})

export default cartReducer.reducer;
export const {addToCart, toggleWishList, removeFromCart} = cartReducer.actions;