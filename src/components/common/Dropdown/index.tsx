import React from 'react';

interface DropdownProps {
  values: string[];
  value?: string;
  disabled?: boolean;
  setValue:
    | React.Dispatch<React.SetStateAction<'Approved' | 'Pending' | 'All'>>
    | React.Dispatch<React.SetStateAction<string>>;
}

const Dropdown = ({
  values,
  value,
  disabled = false,
  setValue,
}: DropdownProps) => {
  const onChange = (e: any) => setValue(e.target.value);

  return (
    <div className="form-control w-full max-w-xl">
      <select
        disabled={disabled}
        className="select select-bordered w-full"
        defaultValue={values[0]}
        onChange={onChange}
        value={value}
      >
        {values.map((value, index) => (
          <option key={index}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
