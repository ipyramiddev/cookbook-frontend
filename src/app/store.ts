import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import authReducer from 'reducers/authSlice';
import cartReducer from 'reducers/cartSlice';
import favoriteSlice from 'reducers/favoriteSlice';
import ingredientSlice from 'reducers/ingredientSlice';
import recipeSlice from 'reducers/recipeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    recipe: recipeSlice,
    ingredient: ingredientSlice,
    favorite: favoriteSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
