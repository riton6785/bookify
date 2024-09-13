import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("user-info")),
  cart: []
}

export const counterSlice = createSlice({
  name: 'usersetup',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    setCart: (state, action) => {
      state.cart.push(action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = counterSlice.actions;
export const { setCart } = counterSlice.actions;

export default counterSlice.reducer;