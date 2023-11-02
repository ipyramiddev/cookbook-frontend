import React from 'react';

interface PaginationProps {
  onNextPage: () => void;
  onPrevPage: () => void;
}

const Pagination = ({ onNextPage, onPrevPage }: PaginationProps) => {
  return (
    <div className="join grid max-w-xs grid-cols-2">
      <button
        className="btn btn-outline join-item p-2 text-xs"
        onClick={() => onPrevPage()}
      >
        Previous page
      </button>
      <button
        className="btn btn-outline join-item p-2 text-xs"
        onClick={() => onNextPage()}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
