import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import BackButton from 'components/common/BackButton';
import { getRecipeById } from 'actions/recipe';
import { useAppSelector } from 'app/hooks';
import { selectDetailedRecipe, selectFeedbacks } from 'reducers/recipeSlice';
import Rating from 'components/common/Rating';
import Input from 'components/common/Input';
import { createFeedback, getFeedback } from 'actions/feeback';
import Chat from 'components/common/Chat';
import { selectIsAuthenticated } from 'reducers/authSlice';

const Recipe = () => {
  const { id } = useParams();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const recipe = useAppSelector(selectDetailedRecipe);
  const feedbacks = useAppSelector(selectFeedbacks);

  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(3);

  useEffect(() => {
    if (id) {
      void getFeedback(Number(id));
      void getRecipeById(Number(id));
    }
  }, [id]);

  const onSubmit = async () => {
    const res = await createFeedback({
      recipeId: Number(id),
      comment: feedback,
      rating,
    });

    if (res) void getFeedback(Number(id));
  };

  return (
    <div className="min-h-screen bg-base-400 p-20">
      <div className="w-full flex justify-end">
        <Link to="/" className="btn btn-md ml-auto">
            Back
        </Link>
      </div>
      {recipe && (
        <div>
          <h1 className="text-5xl font-bold">{recipe.title}</h1>
          <p className="pt-6 text-lg font-bold text-yellow-300">Description</p>
          <p className="py-3">{recipe.description}</p>
          <p className="pt-6 text-lg font-bold text-yellow-300">Instructions</p>
          <p className="py-3">{recipe.instructions}</p>
          <p className="pt-6 text-lg font-bold text-yellow-300">Ingredients</p>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-4">
              <p>{ingredient.name}</p>
              <p>
                {ingredient.amount} {ingredient.unit}
              </p>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-col gap-8 p-4 mt-12">
        {feedbacks.map((feedback, index) => (
          <div className="flex gap-4" key={index}>
            <div className="flex flex-col items-center gap-2">
              <p>{feedback.username}</p>
              <Rating disabled value={feedback.rating} />
            </div>
            <Chat commet={feedback.comment} />
          </div>
        ))}
      </div>
      {isAuthenticated && (
        <div className="flex gap-5 items-center">
          <p className="text-xl font-black">Feedback</p>
          <Rating setValue={setRating} />
          <Input setValue={setFeedback} placeHolder='Comment'/>
          <div className="flex justify-end">
            <button
              type="button"
              className="btn btn-md"
              onClick={() => onSubmit()}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipe;
