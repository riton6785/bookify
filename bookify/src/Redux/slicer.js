import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("user-info")),
}

export const counterSlice = createSlice({
  name: 'usersetup',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = counterSlice.actions

export default counterSlice.reducer