import React from 'react';

interface TextareaProps {
  label: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Textarea = ({ label, setValue }: TextareaProps) => {
  const onChange = (e: any) => setValue(e.target.value);

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <textarea
        className="textarea textarea-bordered h-64"
        placeholder="Bio"
        onChange={onChange}
      />
    </div>
  );
};

export default Textarea;
