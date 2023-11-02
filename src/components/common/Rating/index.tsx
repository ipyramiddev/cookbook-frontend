import React from 'react';

interface RatingProps {
  setValue?: React.Dispatch<React.SetStateAction<number>>;
  value?: number;
  disabled?: boolean;
}

const Rating = ({ value = 3, setValue, disabled = false }: RatingProps) => {
  return (
    <div className="rating">
      <input
        type="radio"
        name={disabled ? 'disabled' : 'rating-2'}
        className="mask mask-star-2 bg-orange-400"
        onChange={(e) => {
          if (e.target.value) setValue && setValue(1);
        }}
        disabled={disabled}
        defaultChecked={value === 1}
      />
      <input
        type="radio"
        name={disabled ? 'disabled' : 'rating-2'}
        className="mask mask-star-2 bg-orange-400"
        onChange={(e) => {
          if (e.target.value) setValue && setValue(2);
        }}
        disabled={disabled}
        defaultChecked={value === 2}
      />
      <input
        type="radio"
        name={disabled ? 'disabled' : 'rating-2'}
        className="mask mask-star-2 bg-orange-400"
        onChange={(e) => {
          if (e.target.value) setValue && setValue(3);
        }}
        disabled={disabled}
        defaultChecked={value === 3}
      />
      <input
        type="radio"
        name={disabled ? 'disabled' : 'rating-2'}
        className="mask mask-star-2 bg-orange-400"
        onChange={(e) => {
          if (e.target.value) setValue && setValue(4);
        }}
        disabled={disabled}
        defaultChecked={value === 4}
      />
      <input
        type="radio"
        name={disabled ? 'disabled' : 'rating-2'}
        className="mask mask-star-2 bg-orange-400"
        onChange={(e) => {
          if (e.target.value) setValue && setValue(5);
        }}
        disabled={disabled}
        defaultChecked={value === 5}
      />
    </div>
  );
};

export default Rating;
