import { store } from 'app/store';
import { CartItemType, RecipeType, setCartItems } from 'reducers/cartSlice';
import api from 'utils/api';

const { dispatch } = store;

export const addRecipeToCart = async (id: number): Promise<boolean> => {
  try {
    await api.post(`api/recipes/${id}/cart_add`);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const removeRecipeFromCart = async (id: number): Promise<boolean> => {
  try {
    await api.post(`api/recipes/${id}/cart_remove`);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getCart = async () => {
  try {
    const res = await api.get('api/cart');

    const recipes: CartItemType[] = res.data.map((item: any) => {
      return {
        id: item.id,
        quantity: item.quantity,
        recipe: item.recipe,
      };
    });

    dispatch(setCartItems(recipes));
  } catch (error) {
    console.error(error);
  }
};
