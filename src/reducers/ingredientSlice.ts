import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface IngredientType {
  id: number;
  name: string;
  unit: string;
  price: number;
  amount: number;
}

interface IngredientSlice {
  ingredients: IngredientType[];
  ingredientDetail?: IngredientType;
}

const initialState: IngredientSlice = {
  ingredients: [],
};

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {
    setIngredientItems: (state, action: PayloadAction<IngredientType[]>) => {
      state.ingredients = action.payload;
    },
    setIngredientDetailedItem: (
      state,
      action: PayloadAction<IngredientType>,
    ) => {
      state.ingredientDetail = action.payload;
    },
    clearIngredient: (state) => {
      state.ingredients = [];
    },
  },
});

export const {
  clearIngredient,
  setIngredientDetailedItem,
  setIngredientItems,
} = ingredientSlice.actions;

export const selectIngredients = (state: RootState) =>
  state.ingredient.ingredients;
export const selectDetailedIngredient = (state: RootState) =>
  state.ingredient.ingredientDetail;

export default ingredientSlice.reducer;
