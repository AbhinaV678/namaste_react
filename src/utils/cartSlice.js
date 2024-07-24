import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items.pop();
    },
    clearCart: (state) => {
      state.items.length = 0;
      //we can also return new state instead of mutating by doing :
      //return {items:[]};
    },
  },
});

//exporting actions
export const { addItem, removeItem, clearCart } = cartSlice.actions;
//exporting reducers
export default cartSlice.reducer;
