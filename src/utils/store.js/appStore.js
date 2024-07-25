import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice"
import locationReducer from "../slices/locationSlice"

const appStore=configureStore({
    reducer:{
        cart:cartReducer,
        location:locationReducer
    }
})

export default appStore;