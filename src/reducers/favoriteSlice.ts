import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { RecipeType } from './cartSlice';

interface FavoriteSlice {
  recipes: RecipeType[];
}

const initialState: FavoriteSlice = {
  recipes: [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setFavoriteItems: (state, action: PayloadAction<RecipeType[]>) => {
      state.recipes = action.payload;
    },
    clearFavorite: (state) => {
      state.recipes = [];
    },
  },
});

export const { clearFavorite, setFavoriteItems } = favoriteSlice.actions;

export const selectFavorite = (state: RootState) => state.favorite.recipes;

export default favoriteSlice.reducer;
