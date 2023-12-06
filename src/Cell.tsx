// Cell.tsx

import React, { useState } from 'react';

interface CellProps {
  row: number;
  col: number;
  isCoin: string | null;
  onPlaceCoin: (row: number, col: number) => void;
  onMoveCoin: (row: number, col: number,isCoin:string|null) => void;
  activePlayer: string;
}

const Cell: React.FC<CellProps> = ({ row, col, isCoin, onPlaceCoin, activePlayer,onMoveCoin }) => {
  const isCrossCell =
    (row === 0 && col === 3) ||
    (row === 1 && (col === 1 || col === 5)) ||
    (row === 3 && (col === 0 || col === 3 || col === 6)) ||
    (row === 5 && (col === 1 || col === 5)) ||
    (row === 6 && col === 3);



  const handleCellClick = () => {
    onMoveCoin(row, col,isCoin);
  };

  //console.log('cell',{row, col, isCoin, onPlaceCoin, activePlayer})

  return (

    <div
      className={`w-10 h-10 border border-gray-500 flex justify-center items-center ${
        isCrossCell ? 'bg-green-500' : ''
      } ${isCoin ? `bg-${isCoin}-500` : ''}`}
      onClick={handleCellClick}
    >
      {isCoin && '🪙'}
      {isCrossCell && (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" className="h-10 w-10">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
    </div>
  );
};

export default Cell;
