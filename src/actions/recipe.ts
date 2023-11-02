import { store } from 'app/store';
import { RecipeType } from 'reducers/cartSlice';
import {
  setRecipeDetailedItem,
  setRecipeItems,
  setRecipePageNumber,
  setRecipePagesUrl,
  setRecipeTotalCount,
} from 'reducers/recipeSlice';
import api from 'utils/api';

const { dispatch } = store;

export const getRecipes = async ({
  search,
  page = 1,
  status = 1,
}: {
  search?: string;
  status?: number;
  page?: number;
}) => {
  try {
    const res = await api.get('/api/recipes', {
      params: {
        search,
        status,
        page,
      },
    });

    const recipes: RecipeType[] = res.data.data.map((item: any) => {
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        ingredients: item.ingredients,
        instructions: item.instructions,
        status: item.status,
      };
    });

    dispatch(setRecipeItems(recipes));
    dispatch(setRecipeTotalCount(res.data.total));
    dispatch(setRecipePageNumber(res.data.current_page));
    dispatch(
      setRecipePagesUrl({
        nextPageUrl: res.data.next_page_url,
        prevPageUrl: res.data.prev_page_url,
      }),
    );
  } catch (error) {
    console.error(error);
  }
};

export const getRecipeById = async (id: number) => {
  try {
    const res = await api.get(`/api/recipes/${id}`);
    const recipe: RecipeType = res.data;

    dispatch(setRecipeDetailedItem(recipe));
  } catch (error) {
    console.error(error);
  }
};

export const createRecipe = async (recipe: {
  title: string;
  description: string;
  instructions: string;
  ingredients: { id: number; amount: number }[];
}): Promise<boolean> => {
  try {
    await api.post('api/recipes', recipe);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const approveRecipe = async (id: number): Promise<boolean> => {
  try {
    await api.post(`api/recipes/${id}/approve`);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteRecipe = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`api/recipes/${id}`);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
