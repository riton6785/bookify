import { createSlice } from "@reduxjs/toolkit"

const initialState: StateType = {
   user: localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info') || '') : null
}

const rootslice = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload
        },
        logoutUser: (state) => {
            state.user = null
        }
    }
     
})

export const {loginUser, logoutUser} = rootslice.actions;
export default rootslice.reducer;
