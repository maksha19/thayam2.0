// Cell.tsx

import React, { useState } from 'react';

interface CellProps {
  row: number;
  col: number;
  isCoin: string | null;
  currentRow: number | null;
  currentCol: number | null;
  redCoinCount: number;
  blueCoinCount: number;
  onMoveCoin: (row: number, col: number, isCoin: string | null) => void;
  activePlayer: string;
}

const Cell: React.FC<CellProps> = ({ row, col, isCoin, activePlayer, onMoveCoin, currentRow, currentCol, redCoinCount, blueCoinCount }) => {
  const isCrossCell =
    (row === 0 && col === 3) ||
    (row === 1 && (col === 1 || col === 5)) ||
    (row === 3 && (col === 0 || col === 3 || col === 6)) ||
    (row === 5 && (col === 1 || col === 5)) ||
    (row === 6 && col === 3);



  const handleCellClick = (isCoin:string |null) => {
    console.log("handleCellClick")
    onMoveCoin(row, col, isCoin);
  };

  // console.log('cell', { row, col, isCoin, redCoinCount, blueCoinCount, activePlayer })

  return (

    <div
      className={`w-12 h-12 border border-gray-500 relative flex justify-center items-center ${isCrossCell ? 'bg-green-500' : ''} ${(redCoinCount > 0 || blueCoinCount >0) && (currentRow === row && currentCol === col) ? `bg-yellow-300` : ''}`}
      onClick={()=>!isCrossCell && handleCellClick(isCoin)} 
    >
      {isCrossCell && (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" className="h-10 w-10 absolute top-0" onClick={()=>(redCoinCount == 0 || blueCoinCount == 0) && handleCellClick(isCoin)}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      {
        isCrossCell ? <>
          {
            (redCoinCount > 0) && (
              <div className="relative" onClick={()=>handleCellClick('red')}>
                <div className={`w-5 h-5 bg-red-500 rounded-full z-10 relative`}>
                  {/* redCoinCount overlay */}
                  {
                    isCrossCell && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold">
                        {redCoinCount}
                      </div>
                    )
                  }
                </div>
              </div>
            )
          }
          {
            (blueCoinCount > 0) && (
              <div className="relative" onClick={()=>handleCellClick("blue")}>
                <div className={`w-5 h-5 bg-[#3b82f6] rounded-full z-10 relative`}>
                  {/* blueCoinCount overlay */}
                  {
                    isCrossCell && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold">
                        {blueCoinCount}
                      </div>
                    )
                  }
                </div>
              </div>
            )
          }</> :
          <>
            {isCoin && (
              <div className={`w-5 h-5 bg-${isCoin}-500 rounded-full z-10 relative`}>
              </div>
            )}
          </>
      }
    </div>
  );
};

export default Cell;
