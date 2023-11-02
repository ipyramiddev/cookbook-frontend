import React from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';
import { CartItemType, RecipeType } from 'reducers/cartSlice';
import { selectIsAdmin, selectIsAuthenticated } from 'reducers/authSlice';
import { IngredientType } from 'reducers/ingredientSlice';

interface TableProps {
  view?: boolean;
  values:
    | RecipeType[]
    | IngredientType[]
    | {
        title: string;
        ingredientNames: string;
        quantity: number;
        id: number;
        totalPrice: string;
      }[];
  favouriteItems?: RecipeType[];
  addToCart?: (recipe: RecipeType) => void;
  deleteInCart?: (recipe: RecipeType) => void;
  addToFavourite?: (recipe: RecipeType) => void;
  deleteFavourite?: (recipe: RecipeType) => void;
  approveItem?: (id: number) => void;
  deleteItem?: (id: number) => void;
}

const Table = ({
  view,
  values,
  favouriteItems,
  addToCart,
  deleteInCart,
  addToFavourite,
  deleteFavourite,
  approveItem,
  deleteItem,
}: TableProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAdmin = useAppSelector(selectIsAdmin);

  return (
    <div className="w-full overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th></th>
            {Object.keys(values[0]).map((filter, index) =>
              filter === 'status'
                ? isAdmin && <th key={index}>{filter}</th>
                : filter !== 'id' &&
                  filter !== 'ingredients' && <th key={index}>{filter}</th>,
            )}
            {view && <th>action</th>}
          </tr>
        </thead>
        <tbody>
          {values.map((value: any, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              {Object.keys(value).map((text, index) =>
                text === 'status'
                  ? isAdmin && (
                      <td key={index}>
                        {value[text] === 0 ? 'Pending' : 'Approved'}
                      </td>
                    )
                  : text !== 'id' &&
                    text !== 'ingredients' && (
                      <td
                        key={index}
                        className="max-w-2xl  overflow-hidden truncate "
                      >
                        {value[text]}
                      </td>
                    ),
              )}
              {view && (
                <td className="w-16">
                  <Link to={`/recipe/${value.id}`} className="btn btn-xs">
                    View
                  </Link>
                </td>
              )}
              {isAuthenticated && addToCart && (
                <td className="w-40">
                  {
                    <button
                      className="btn btn-xs"
                      onClick={() => addToCart(value)}
                    >
                      Add to cart
                    </button>
                  }
                </td>
              )}
              {isAuthenticated && deleteInCart && (
                <td className="w-40">
                  {
                    <button
                      className="btn btn-xs"
                      onClick={() => deleteInCart(value)}
                    >
                      Remove in cart
                    </button>
                  }
                </td>
              )}
              {isAuthenticated && favouriteItems && (
                <td className="w-40">
                  {!favouriteItems.find(
                    (favouriteItem) => favouriteItem.id === value.id,
                  )
                    ? addToFavourite && (
                        <button
                          className="btn btn-xs"
                          onClick={() => addToFavourite(value)}
                        >
                          Like
                        </button>
                      )
                    : deleteFavourite && (
                        <button
                          className="btn btn-xs"
                          onClick={() => deleteFavourite(value)}
                        >
                          Unlike
                        </button>
                      )}
                </td>
              )}
              {isAuthenticated &&
                isAdmin &&
                approveItem &&
                value.status === 0 && (
                  <td className="w-28">
                    {
                      <button
                        className="btn btn-xs"
                        onClick={() => approveItem(value.id)}
                      >
                        Approve
                      </button>
                    }
                  </td>
                )}
              {isAuthenticated && isAdmin && deleteItem && (
                <td className="w-28">
                  {
                    <button
                      className="btn btn-xs"
                      onClick={() => deleteItem(value.id)}
                    >
                      Delete
                    </button>
                  }
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
