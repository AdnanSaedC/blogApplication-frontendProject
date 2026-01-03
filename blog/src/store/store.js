import { configureStore } from "@reduxjs/toolkit";
import authSliceReducers from "./auth.js"

const store = configureStore({
    reducer:authSliceReducers
})

export default store;