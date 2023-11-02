import React, { useEffect, useState } from 'react';

import Input from 'components/common/Input';
import Textarea from 'components/common/Textarea';
import BackButton from 'components/common/BackButton';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from 'components/common/Dropdown';
import { getIngredients } from 'actions/ingredient';
import { useAppSelector } from 'app/hooks';
import { IngredientType, selectIngredients } from 'reducers/ingredientSlice';
import { createRecipe } from 'actions/recipe';

const Create = () => {
  const navigate = useNavigate();

  const ingredientsItems = useAppSelector(selectIngredients);
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [ingredients, setIngredients] = useState<
    { ingredient: IngredientType; amount: number }[]
  >([]);

  useEffect(() => {
    void getIngredients();
  }, []);

  const onSubmit = async () => {
    const ingredientParams = ingredients.map((ingredient) => {
      return {
        id: ingredient.ingredient.id,
        amount: ingredient.amount,
      };
    });

    const res = await createRecipe({
      title,
      instructions,
      description,
      ingredients: ingredientParams,
    });
    if (res) {
      navigate('/');
    }
  };

  const addIngredient = () => {
    const ingredient = ingredientsItems.find(
      (item) => item.name === selectedIngredient,
    );

    if (ingredient)
      setIngredients([
        ...ingredients,
        {
          ingredient,
          amount: selectedAmount,
        },
      ]);

    if (ingredientsItems.length > 0)
      setSelectedIngredient(ingredientsItems[0].name);
    setSelectedAmount(0);
  };

  const removeIngredient = (index: number) => {
    const tempIngredients = [...ingredients];
    tempIngredients.splice(index, 1);
    setIngredients(tempIngredients);
  };

  useEffect(() => {
    if (ingredientsItems.length > 0)
      setSelectedIngredient(ingredientsItems[0].name);
  }, [ingredientsItems]);

  return (
    <div className="flex h-screen w-full justify-center">
      <div className="w-full max-w-[1980px] p-20">
        <div className="flex w-full max-w-[1980px] items-start justify-between ">
          <h1 className='text-4xl text-yellow-300'>Create A Recipe</h1>
        
          <div className="flex gap-5">
            <Link to="/" className="btn btn-md">
                Back
            </Link>
          </div>
        </div>
        <form className="flex flex-col gap-8 mt-12">
          <Input setValue={setTitle} labal="Title" />
          <Input setValue={setDescription} labal="Description" />
          <div className="flex flex-col gap-2">
            <p className="text-[0.875rem]">Ingredients</p>
            {ingredients.map((item, index) => (
              <div className="flex gap-5" key={index}>
                <Dropdown
                  values={[item.ingredient.name]}
                  setValue={setSelectedIngredient}
                  disabled
                />
                <input
                  value={item.amount}
                  disabled
                  className="input input-bordered w-full max-w-xl"
                  type="number"
                />
                <button
                  type="button"
                  className="btn btn-md"
                  onClick={() => removeIngredient(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="flex gap-5">
              <Dropdown
                values={ingredientsItems.map((item) => item.name)}
                setValue={setSelectedIngredient}
                value={selectedIngredient}
              />
              <Input
                setValue={setSelectedAmount}
                type="number"
                value={selectedAmount}
              />
              <button
                type="button"
                className="btn btn-md"
                onClick={() => addIngredient()}
              >
                Add
              </button>
            </div>
          </div>
          
          <Textarea setValue={setInstructions} label="Instructions" />
          
          <p className='text-yellow-300'>*Note: The submitted recipe would be shown only when the administrator approve it.</p>
          <div className="flex justify-end">
            <button
              type="button"
              className="btn btn-md"
              onClick={() => onSubmit()}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
