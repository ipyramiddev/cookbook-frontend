import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { IngredientType } from './ingredientSlice';

export interface RecipeType {
  id: number;
  title: string;
  description: string;
  ingredients: IngredientType[];
  instructions: string;
  status: number;
}

export interface CartItemType {
  id: number;
  quantity: number;
  recipe: RecipeType;
}

interface CartSlice {
  cartItems: CartItemType[];
}

const initialState: CartSlice = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItemType[]>) => {
      state.cartItems = action.payload;
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { setCartItems, clearCart } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.cartItems;

export default cartSlice.reducer;
