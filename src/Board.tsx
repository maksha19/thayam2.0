// Board.tsx

import React, { useEffect, useState } from 'react';
import Cell from './Cell';

interface BoardProps {
    coinCapture: (player: string) => void;
    activePlayer: string;
    diceResult: number | null;
}

const Board: React.FC<BoardProps> = ({ diceResult, activePlayer, coinCapture }) => {
    const initialBoardState: { isCoin: string | null, redCoinCount: number, blueCoinCount: number }[][] = Array.from({ length: 7 }, () =>
        Array.from({ length: 7 }, () => ({ isCoin: null, redCoinCount: 0, blueCoinCount: 0 }))
    );

    const [boardState, setBoardState] = useState(initialBoardState);
    const [selected, setSelected] = useState<boolean>(false);
    const [currentRow, setCurrentRow] = useState<number | null>(null);
    const [currentCol, setCurrentCol] = useState<number | null>(null);

    useEffect(() => {
        // Determine the target cell based on the active player
        console.log('diceResult', diceResult)
        if (diceResult && diceResult === 1) {
            const targetRow = activePlayer === 'red' ? 0 : 6;
            const targetCol = 3;
            console.log({ targetRow, targetCol, activePlayer })
            // Update the board state to indicate the coin placement
            setBoardState((prevBoardState) => {
                const newBoardState = [...prevBoardState];
                newBoardState[targetRow][targetCol].isCoin = activePlayer;
                if (activePlayer === 'red') {
                    newBoardState[targetRow][targetCol].redCoinCount = newBoardState[targetRow][targetCol].redCoinCount + 1
                } else if (activePlayer === 'blue') {
                    newBoardState[targetRow][targetCol].blueCoinCount = newBoardState[targetRow][targetCol].blueCoinCount + 1
                }
                return newBoardState;
            });
        }
    }, [diceResult])

    const onMoveCoin = (row: number, col: number, isCoin: string | null) => {

        if (selected) {
            // If a coin is selected, move it to the clicked cell
            if (currentRow !== null && currentCol !== null) {
                const newBoardState = [...boardState];
                const movedCoin = newBoardState[currentRow][currentCol].isCoin;
                const oldCoin = newBoardState[row][col].isCoin

                // crossCell can stack up multiplayer coin
                const isCrossCell =
                    (row === 0 && col === 3) ||
                    (row === 1 && (col === 1 || col === 5)) ||
                    (row === 3 && (col === 0 || col === 3 || col === 6)) ||
                    (row === 5 && (col === 1 || col === 5)) ||
                    (row === 6 && col === 3);

                console.log({ isCrossCell, oldCoin, movedCoin, row, col })
                // same player coin should not capture, it can stack up at crosscell
                if (!isCrossCell) {
                    if (oldCoin && (oldCoin === movedCoin)) {
                        console.log('sameplayer coin')
                        if(currentRow === row && currentCol === col){
                            setSelected(false);
                            setCurrentRow(null);
                            setCurrentCol(null);
                        }
                        return
                    }
                }

                console.log("toPalce", newBoardState[row][col])
                console.log("formPalce", newBoardState[currentRow][currentCol])

                // Move the coin from the source cell to the target cell
                newBoardState[currentRow][currentCol].isCoin = null;
                if (movedCoin === 'red') {
                    newBoardState[currentRow][currentCol].redCoinCount = newBoardState[currentRow][currentCol].redCoinCount - 1
                    newBoardState[row][col].redCoinCount = newBoardState[row][col].redCoinCount + 1
                } else if (movedCoin === 'blue') {
                    newBoardState[currentRow][currentCol].blueCoinCount = newBoardState[currentRow][currentCol].blueCoinCount - 1
                    newBoardState[row][col].blueCoinCount = newBoardState[row][col].blueCoinCount + 1
                }
                newBoardState[row][col].isCoin = movedCoin;


                // Update the board state
                setTimeout(() => {
                    setBoardState(newBoardState);
                    setSelected(false);
                    setCurrentRow(null);
                    setCurrentCol(null);
                }, 0)

                if (oldCoin && !isCrossCell && !(oldCoin === movedCoin)) coinCapture(oldCoin)
            }
        } else {
            // If no coin is selected, select the current cell
            if (isCoin && isCoin === activePlayer) {
                setSelected(true);
                setCurrentRow(row);
                setCurrentCol(col);
                console.log("selectedPlace", boardState[row][col])
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
                            onMoveCoin={onMoveCoin}
                            activePlayer={activePlayer}
                            currentRow ={currentRow}
                            currentCol ={currentCol}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;
