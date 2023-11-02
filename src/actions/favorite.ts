import { store } from 'app/store';
import { RecipeType } from 'reducers/cartSlice';
import { setFavoriteItems } from 'reducers/favoriteSlice';
import api from 'utils/api';

const { dispatch } = store;

export const addRecipeToFavourite = async (id: number): Promise<boolean> => {
  try {
    await api.post(`api/recipes/${id}/favorite_add`);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const removeRecipeFromFavourite = async (
  id: number,
): Promise<boolean> => {
  try {
    await api.post(`api/recipes/${id}/favorite_remove`);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getFavourite = async () => {
  try {
    const res = await api.get('api/favorite');

    const recipes: RecipeType[] = res.data.map((item: any) => {
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        ingredients: item.ingredients,
        instructions: item.instructions,
        status: item.status,
      };
    });

    dispatch(setFavoriteItems(recipes));
  } catch (error) {
    console.error(error);
  }
};
