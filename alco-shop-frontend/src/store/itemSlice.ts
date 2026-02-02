import { RootState } from './store';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategoryProducts } from '../models/category/ICategoryProducts';



const itemSlice = createSlice({
  name: 'items',
  initialState: {
    items: [] as (ICategoryProducts & { amount: number })[],
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find((item) => item.ProductId === action.payload.ProductId);

      if (existingItem) {
        existingItem.amount += 1;
      } else {
        state.items.push({
          ...action.payload,
          amount: 1,
        });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.ProductId !== action.payload);
    },
    increment: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.ProductId === action.payload);
      if (item) {
        item.amount += 1;
      }
    },
    decrement: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.ProductId === action.payload);
      if (item && item.amount > 0) {
        item.amount -= 1;
      }
    },
    clearCart: (state ) => {
      state.items = []

    } , 



  },
});

export const { addItem, removeItem , increment  ,decrement , clearCart } = itemSlice.actions;
export const selectTotalPrice = (state: RootState) => {
  return state.items.items.reduce((sum: number, item: any) => sum + (Number(item.Price) * item.amount), 0);
};
export default itemSlice.reducer;
export const selectTotalPriceDeliver = (state: RootState) => {
  return state.items.items.reduce((sum: number, item: any) => sum + (Number(item.Price) * item.amount), 110);
};



