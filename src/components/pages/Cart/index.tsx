import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from 'components/common/Table';
import { RecipeType, selectCart } from 'reducers/cartSlice';
import { useAppSelector } from 'app/hooks';
import BackButton from 'components/common/BackButton';
import { getCart, removeRecipeFromCart } from 'actions/cart';

const Cart = () => {
  const cartItems = useAppSelector(selectCart);

  const [tableInfos, setTableInfos] = useState<
    {
      title: string;
      ingredientNames: string;
      quantity: number;
      id: number;
      totalPrice: string;
    }[]
  >([]);

  useEffect(() => {
    const tableInfos = cartItems.map((item) => {
      let ingredient = item.recipe.ingredients
        .map(
          (ingredient) =>
            ingredient.name + ' : ' + ingredient.amount + ingredient.unit,
        )
        .join(', ');

      const totalPrice = item.recipe.ingredients.reduce(
        (sum, ingredient) => sum + ingredient.price * ingredient.amount,
        0,
      );
      return {
        title: item.recipe.title,
        ingredientNames: ingredient === '' ? 'No ingredients' : ingredient,
        quantity: item.quantity,
        id: item.recipe.id,
        totalPrice: `$${(totalPrice * item.quantity).toFixed(2)}`,
      };
    });

    setTableInfos(tableInfos);
  }, [cartItems]);

  useEffect(() => {
    void getCart();
  }, []);

  const deleteInCart = async (recipe: RecipeType) => {
    const res = await removeRecipeFromCart(recipe.id);

    if (res) getCart();
  };

  return (
    <div className="flex h-screen w-full justify-center">
      <div className="flex w-full max-w-[1980px] flex-col items-center gap-10 p-20">
        <div className="w-full flex justify-end">
          <h1 className='text-4xl text-yellow-300'>Cart</h1>

          <Link to="/" className="btn btn-md ml-auto">
              Back
          </Link>
        </div>
        {tableInfos.length > 0 ? (
          <Table values={tableInfos} deleteInCart={deleteInCart} />
        ) : (
          <p>No items are in cart</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
