import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { selectIsAdmin, selectIsAuthenticated } from 'reducers/authSlice';
import { RecipeType, selectCart } from 'reducers/cartSlice';
import { useAppSelector } from 'app/hooks';
import {
  selectRecipePageNumber,
  selectRecipePageUrls,
  selectRecipes,
} from 'reducers/recipeSlice';
import { approveRecipe, deleteRecipe, getRecipes } from 'actions/recipe';
import Pagination from 'components/common/Pagination';
import Dropdown from 'components/common/Dropdown';
import Input from 'components/common/Input';
import Table from 'components/common/Table';
import { addRecipeToCart, getCart, removeRecipeFromCart } from 'actions/cart';
import {
  addRecipeToFavourite,
  getFavourite,
  removeRecipeFromFavourite,
} from 'actions/favorite';
import { selectFavorite } from 'reducers/favoriteSlice';

const Landing = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const favouriteItems = useAppSelector(selectFavorite);
  const recipes = useAppSelector(selectRecipes);
  const isAdmin = useAppSelector(selectIsAdmin);
  const pageNumber = useAppSelector(selectRecipePageNumber);
  const pageUrls = useAppSelector(selectRecipePageUrls);

  const [status, setSatus] = useState<'Approved' | 'Pending' | 'All'>(
    'All',
  );
  const [search, setSearch] = useState('');

  const onSearch = () => {
    let statusValue;
    if (status === 'Approved') statusValue = 1;
    else if (status === 'Pending') statusValue = 0;
    else if (status === 'All') statusValue = -1;

    void getRecipes({ search, status: statusValue });
  };

  useEffect(() => {
    void getRecipes({ status: 1 });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      void getCart();
      void getFavourite();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    let statusValue;
    if (status === 'Approved') statusValue = 1;
    else if (status === 'Pending') statusValue = 0;
    else if (status === 'All') statusValue = -1;

    void getRecipes({ search, status: statusValue });
  }, [status]);

  const addToCart = async (recipe: RecipeType) => {
    const res = await addRecipeToCart(recipe.id);

    if (res) getCart();
  };

  const addToFavourite = async (recipe: RecipeType) => {
    const res = await addRecipeToFavourite(recipe.id);

    if (res) getFavourite();
  };

  const deleteInFavourite = async (recipe: RecipeType) => {
    const res = await removeRecipeFromFavourite(recipe.id);

    if (res) getFavourite();
  };

  const onApprove = async (id: number) => {
    const res = await approveRecipe(id);

    if (res) onSearch();
  };

  const onDelete = async (id: number) => {
    const res = await deleteRecipe(id);

    if (res) onSearch();
  };

  const onNextPage = () => {
    if (pageUrls.nextPageUrl) {
      let statusValue;
      if (status === 'Approved') statusValue = 1;
      else if (status === 'Pending') statusValue = 0;
      else if (status === 'All') statusValue = -1;

      void getRecipes({ search, status: statusValue, page: pageNumber + 1 });
    }
  };

  const onPrevPage = () => {
    if (pageUrls.prevPageUrl) {
      let statusValue;
      if (status === 'Approved') statusValue = 1;
      else if (status === 'Pending') statusValue = 0;
      else if (status === 'All') statusValue = -1;

      void getRecipes({ search, status: statusValue, page: pageNumber - 1 });
    }
  };

  return (
    <div className="flex h-screen w-full justify-center">
      <div className="flex w-full max-w-[1980px] flex-col items-center gap-10 p-20 pb-10">
        <div className="flex w-full justify-between">
          <h1 className='text-4xl text-yellow-300'>Recipes</h1>

          <div className="flex gap-4">
            <Link to="/create" className="btn btn-md">
              Create a Recipe
            </Link>
            {isAdmin && (
              <Link to="/ingredient" className="btn btn-md">
                Ingredients Page
              </Link>
            )}
            <Link to="/cart" className="btn btn-md">
              Cart Page
            </Link>
          </div>
        </div>
        <div className="flex w-full max-w-[800px] gap-4">
          <Input setValue={setSearch} placeHolder='Search keyword' />
          {isAdmin && (
            <Dropdown
              values={['All', 'Approved', 'Pending']}
              setValue={setSatus}
            />
          )}
          <button className="btn btn-md" onClick={() => onSearch()}>
            Search
          </button>
        </div>
        {recipes.length > 0 ? (
          <>
            <Table
              view
              values={recipes}
              favouriteItems={favouriteItems}
              addToCart={addToCart}
              approveItem={onApprove}
              addToFavourite={addToFavourite}
              deleteFavourite={deleteInFavourite}
              deleteItem={onDelete}
            />
            <Pagination onNextPage={onNextPage} onPrevPage={onPrevPage} />
          </>
        ) : (
          <p>No items</p>
        )}
      </div>
    </div>
  );
};

export default Landing;
