import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { RecipeType } from './cartSlice';

export interface FeedbackType {
  username: string;
  comment: string;
  rating: number;
}

interface RecipeSlice {
  recipes: RecipeType[];
  recipeDetail?: RecipeType;
  feedbacks: FeedbackType[];
  totalCount: number;
  pageNumber: number;
  nextPageUrl: string | null;
  prevPageUrl: string | null;
}

const initialState: RecipeSlice = {
  recipes: [],
  feedbacks: [],
  totalCount: 0,
  pageNumber: 1,
  nextPageUrl: null,
  prevPageUrl: null,
};

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    setRecipeItems: (state, action: PayloadAction<RecipeType[]>) => {
      state.recipes = action.payload;
    },
    setRecipeDetailedItem: (state, action: PayloadAction<RecipeType>) => {
      state.recipeDetail = action.payload;
    },
    setRecipeTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    setRecipePagesUrl: (
      state,
      action: PayloadAction<{ nextPageUrl: string; prevPageUrl: string }>,
    ) => {
      state.nextPageUrl = action.payload.nextPageUrl;
      state.prevPageUrl = action.payload.prevPageUrl;
    },
    clearRecipe: (state) => {
      state.recipes = [];
    },
    setRecipePageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    setFeedback: (state, action: PayloadAction<FeedbackType[]>) => {
      state.feedbacks = action.payload;
    },
  },
});

export const {
  setRecipeItems,
  clearRecipe,
  setRecipeDetailedItem,
  setRecipePageNumber,
  setRecipePagesUrl,
  setRecipeTotalCount,
  setFeedback,
} = recipeSlice.actions;

export const selectRecipes = (state: RootState) => state.recipe.recipes;
export const selectDetailedRecipe = (state: RootState) =>
  state.recipe.recipeDetail;
export const selectRecipePageNumber = (state: RootState) =>
  state.recipe.pageNumber;
export const selectRecipePageUrls = (state: RootState) => {
  return {
    nextPageUrl: state.recipe.nextPageUrl,
    prevPageUrl: state.recipe.prevPageUrl,
  };
};
export const selectFeedbacks = (state: RootState) => state.recipe.feedbacks;

export default recipeSlice.reducer;
