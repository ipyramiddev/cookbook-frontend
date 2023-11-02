import React from 'react';

interface InputProps {
  labal?: string;
  placeHolder?: string;
  value?: number | string;
  type?: 'text' | 'password' | 'number';
  setValue:
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<number>>;
}

const Input = ({
  labal,
  placeHolder = labal,
  value,
  type = 'text',
  setValue,
}: InputProps) => {
  const onChange = (e: any) => setValue(e.target.value);

  return (
    <div className="form-control w-full max-w-xl">
      {labal && (
        <label className="label">
          <span className="label-text">{labal}</span>
        </label>
      )}
      <input
        type={type}
        name={labal}
        value={value}
        placeholder={placeHolder}
        className="input input-bordered w-full max-w-xl"
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
