// Board.tsx

import React, { useEffect, useState } from 'react';
import Cell from './Cell';

interface BoardProps {
    onMoveCoin?: (row: number, col: number, player: string) => void;
    activePlayer: string;
    diceResult: number | null;
}

const Board: React.FC<BoardProps> = ({ diceResult, activePlayer }) => {
    const initialBoardState: { isCoin: string | null, coinCount: number }[][] = Array.from({ length: 7 }, () =>
        Array.from({ length: 7 }, () => ({ isCoin: null, coinCount: 0 }))
    );

    const [boardState, setBoardState] = useState(initialBoardState);
    const [selected, setSelected] = useState<boolean>(false);
    const [currentRow, setCurrentRow] = useState<number | null>(null);
    const [currentCol, setCurrentCol] = useState<number | null>(null);

    useEffect(() => {
        // Determine the target cell based on the active player
        if (diceResult && diceResult === 1) {
            const targetRow = activePlayer === 'red' ? 0 : 6;
            const targetCol = 3;

            // Update the board state to indicate the coin placement
            setBoardState((prevBoardState) => {
                const newBoardState = [...prevBoardState];
                newBoardState[targetRow][targetCol].isCoin = activePlayer;
                newBoardState[targetRow][targetCol].coinCount = newBoardState[targetRow][targetCol].coinCount < 6 ?
                    newBoardState[targetRow][targetCol].coinCount++ : newBoardState[targetRow][targetCol].coinCount;
                return newBoardState;
            });
        }
    }, [diceResult])

    const placeCoin = (row: number, col: number) => {
        const newBoardState = [...boardState];
        newBoardState[row][col].isCoin = activePlayer;
        setBoardState(newBoardState);
    };

    const onMoveCoin = (row: number, col: number,isCoin:string|null) => {

        if (selected) {
            // If a coin is selected, move it to the clicked cell
            if (currentRow !== null && currentCol !== null) {             
                const newBoardState = [...boardState];
                const movedCoin = newBoardState[currentRow][currentCol].isCoin;

                // Move the coin from the source cell to the target cell
                newBoardState[currentRow][currentCol].isCoin = null;
                newBoardState[row][col].isCoin = movedCoin;

                // Update the board state
                setTimeout(() => {
                    setBoardState(newBoardState);
                    setSelected(false);
                    setCurrentRow(null);
                    setCurrentCol(null);
                }, 0)
            }
        } else {
            // If no coin is selected, select the current cell
              if (isCoin && isCoin === activePlayer) {
                setSelected(true);
                setCurrentRow(row);
                setCurrentCol(col);
              }
        }

    };

    return (
        <div className="grid grid-rows-7 grid-cols-7 gap-1">
            {boardState.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center items-center flex-col">
                    {row.map((cell, colIndex) => (
                        <Cell
                            key={colIndex}
                            row={rowIndex}
                            col={colIndex}
                            isCoin={cell.isCoin}
                            onPlaceCoin={placeCoin}
                            onMoveCoin={onMoveCoin}
                            activePlayer={activePlayer}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;
