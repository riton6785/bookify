import { configureStore } from '@reduxjs/toolkit'
import userreducer from "./slicer"

const store = configureStore({
  reducer: {
    userreducer: userreducer
  },
})

export default store;