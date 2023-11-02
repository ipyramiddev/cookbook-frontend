import React, { useEffect } from 'react';

import { selectIngredients } from 'reducers/ingredientSlice';
import { useAppSelector } from 'app/hooks';
import Table from 'components/common/Table';
import BackButton from 'components/common/BackButton';
import { deleteIngredient, getIngredients } from 'actions/ingredient';
import { selectIsAdmin } from 'reducers/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const Ingredient = () => {
  const navigate = useNavigate();

  const ingredients = useAppSelector(selectIngredients);
  const isAdmin = useAppSelector(selectIsAdmin);

  useEffect(() => {
    if (isAdmin === false) navigate('/');
  }, [isAdmin]);

  useEffect(() => {
    void getIngredients();
  }, []);

  const onDelete = async (id: number) => {
    const res = await deleteIngredient(id);

    if (res) void getIngredients();
  };

  return (
    <div className="flex h-screen w-full justify-center">
      <div className="flex w-full max-w-[1980px] flex-col items-start gap-10 p-20 pb-10">
        <div className="flex w-full max-w-[1980px] items-start justify-between ">
          <h1 className='text-4xl text-yellow-300'>Ingredients</h1>
        
          <div className="flex gap-5">
            <Link to="/" className="btn btn-md">
                Back
            </Link>
            <Link to="/ingredient/create" className="btn btn-md">
                Create
            </Link>
          </div>
        </div>
        
        {ingredients.length > 0 ? (
          <>
            <Table values={ingredients} deleteItem={onDelete} />
          </>
        ) : (
          <p>No items</p>
        )}
      </div>
    </div>
  );
};

export default Ingredient;
