import { createSlice } from "@reduxjs/toolkit";

const initialState: ReviewState = {
    reviews: []
}
const reviewReducer = createSlice({
    initialState,
    name: "Review reducers",
    reducers: {
        addReview: (state, action)=> {
            state.reviews.push(...action.payload)
        }
    }
})

export const {addReview} = reviewReducer.actions

export default reviewReducer.reducer;
