import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  children?: React.ReactNode;
}

const BackButton = ({ children }: BackButtonProps) => {
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex w-full justify-end gap-4">
      {children}
      <button className="btn btn-md" onClick={onBack}>
        Back
      </button>
    </div>
  );
};

export default BackButton;
