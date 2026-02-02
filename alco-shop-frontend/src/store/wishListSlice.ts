import { RootState } from './store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategoryProducts } from '../models/category/ICategoryProducts';

const likeItem = createSlice({
  name: 'like',
  initialState: {
    items: [] as (ICategoryProducts & { amount: number })[],
  },
  reducers: {
    likeItems: (state, action) => {
      const index = state.items.findIndex((item) => item.ProductId === action.payload.ProductId);
      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push({
          ...action.payload,
          amount: 1,
        });
      }
    },
    removeLikeItem: (state, action) => {
      state.items = state.items.filter((item) => item.ProductId !== action.payload);
    },
  },
});

export const { likeItems, removeLikeItem } = likeItem.actions;
export default likeItem.reducer;
