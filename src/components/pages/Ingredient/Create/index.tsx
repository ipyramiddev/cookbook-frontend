import React, { useState } from 'react';

import Input from 'components/common/Input';
import BackButton from 'components/common/BackButton';
import { Link, useNavigate } from 'react-router-dom';
import { createIngredient } from 'actions/ingredient';

const CreateIngredient = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState(0);

  const onSubmit = async () => {
    const res = await createIngredient({
      name,
      unit,
      price: price,
    });

    if (res) {
      navigate('/ingredient');
    }
  };

  return (
    <div className="flex h-screen w-full justify-center">
      <div className="w-full max-w-[1980px] p-20">
        <Link to="/ingredients" className="btn btn-md">
                Back
        </Link>
        <h1 className='text-center text-2xl text-yellow-300'>Register an ingredient</h1>
        <div className="flex items-center justify-center pt-20">
          <form className="flex w-96 flex-col gap-4">
            <Input setValue={setName} labal="Name" placeHolder='ex) Granulated Sugar' />
            <Input setValue={setUnit} labal="Unit" placeHolder='ex) kg or ml ...' />
            <Input setValue={setPrice} labal="Price" type="number" placeHolder='ex) 0.5' />
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
    </div>
  );
};

export default CreateIngredient;
