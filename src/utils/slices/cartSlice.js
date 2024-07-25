import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addItemsToCart: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) state.cartItems[index].OrderQuantity++;
      else state.cartItems.push({ ...action.payload, OrderQuantity: 1 });
    },
    removeItemFromCart: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1 && state.cartItems[index].OrderQuantity >1) state.cartItems[index].OrderQuantity--;
      else state.cartItems.splice(index, 1);
    },
    clearCartItems: (state) => {
      state.cartItems.length = 0;
    },
  },
});

export const { addItemsToCart, removeItemFromCart, clearCartItems } =
  cartSlice.actions;

export default cartSlice.reducer;
