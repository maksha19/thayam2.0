// Cell.tsx

import React, { useState } from 'react';

interface CellProps {
  row: number;
  col: number;
  isCoin: string | null;
  currentRow: number | null;
  currentCol: number | null;
  onMoveCoin: (row: number, col: number, isCoin: string | null) => void;
  activePlayer: string;
}

const Cell: React.FC<CellProps> = ({ row, col, isCoin, activePlayer, onMoveCoin, currentRow, currentCol }) => {
  const isCrossCell =
    (row === 0 && col === 3) ||
    (row === 1 && (col === 1 || col === 5)) ||
    (row === 3 && (col === 0 || col === 3 || col === 6)) ||
    (row === 5 && (col === 1 || col === 5)) ||
    (row === 6 && col === 3);



  const handleCellClick = () => {
    onMoveCoin(row, col, isCoin);
  };

  //console.log('cell',{row, col, isCoin, onPlaceCoin, activePlayer})

  return (

    <div
      className={`w-10 h-10 border border-gray-500 relative flex justify-center items-center ${isCrossCell ? 'bg-green-500' : ''} ${isCoin && (currentRow === row && currentCol === col) ? `bg-yellow-300` : ''}`}
      onClick={handleCellClick}
    >
      {isCrossCell && (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" className="h-10 w-10 absolute top-0">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      {isCoin && (
        <div className={`w-5 h-5 bg-${isCoin}-500 rounded-full z-10 relative`}>
        </div>
      )}
    </div>
  );
};

export default Cell;
