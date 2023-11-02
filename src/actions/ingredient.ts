import { store } from 'app/store';
import { IngredientType, setIngredientItems } from 'reducers/ingredientSlice';
import api from 'utils/api';

const { dispatch } = store;

export const getIngredients = async () => {
  try {
    const res = await api.get('/api/ingredients');

    const ingredients: IngredientType[] = res.data.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        unit: item.unit,
        price: item.price,
      };
    });

    dispatch(setIngredientItems(ingredients));
  } catch (error) {
    console.error(error);
  }
};

export const createIngredient = async (
  ingredient: Partial<IngredientType>,
): Promise<boolean> => {
  try {
    await api.post('api/ingredients', ingredient);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteIngredient = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`api/ingredients/${id}`);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
