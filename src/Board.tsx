// Board.tsx

import React, { useEffect, useState } from 'react';
import Cell from './Cell';

export type BoardState = { isCoin: string | null, redCoinCount: number, blueCoinCount: number }[][]
interface BoardProps {
    coinCapture: (player: string) => void;
    switchPlayer: () => void;
    activePlayer: string;
    diceResult: number | null;
}

const Board: React.FC<BoardProps> = ({ diceResult, activePlayer, coinCapture, switchPlayer}) => {
    const initialBoardState: BoardState = Array.from({ length: 7 }, () =>
        Array.from({ length: 7 }, () => ({ isCoin: null, redCoinCount: 0, blueCoinCount: 0 }))
    );

    const [boardState, setBoardState] = useState(initialBoardState);
    const [selected, setSelected] = useState<string | null>(null);
    const [currentRow, setCurrentRow] = useState<number | null>(null);
    const [currentCol, setCurrentCol] = useState<number | null>(null);

    useEffect(() => {
        setSelected(null);
        setCurrentRow(null);
        setCurrentCol(null);
    }, [activePlayer])

    useEffect(() => {
        // Determine the target cell based on the active player
        console.log('diceResult useEffect', diceResult)
        if (diceResult === null) {
            return
        }
        if (diceResult === 1) {
            const targetRow = activePlayer === 'red' ? 0 : 6;
            const targetCol = 3;
            console.log({ targetRow, targetCol, activePlayer })
            // Update the board state to indicate the coin placement
            setBoardState((prevBoardState) => {
                const newBoardState = [...prevBoardState];
                if (activePlayer === 'red' && newBoardState[targetRow][targetCol].redCoinCount < 5) {
                    newBoardState[targetRow][targetCol].redCoinCount = newBoardState[targetRow][targetCol].redCoinCount + 1
                    newBoardState[targetRow][targetCol].isCoin = activePlayer;
                } else if (activePlayer === 'blue' && newBoardState[targetRow][targetCol].blueCoinCount < 5) {
                    newBoardState[targetRow][targetCol].blueCoinCount = newBoardState[targetRow][targetCol].blueCoinCount + 1
                    newBoardState[targetRow][targetCol].isCoin = activePlayer;
                }
                return newBoardState;
            });
        }
        // eslint-disable-next-line
    }, [diceResult])

    const onMoveCoin = (row: number, col: number, isCoin: string | null) => {
        console.log("onMoveCoin", { row, col, isCoin })

        if (selected) {
            // If a coin is selected, move it to the clicked cell
            if (currentRow !== null && currentCol !== null) {
                const newBoardState = [...boardState];
                const movedCoin = selected;
                const oldCoin = newBoardState[row][col].isCoin

                // crossCell can stack up multiplayer coin
                const isCrossCell =
                    (row === 0 && col === 3) ||
                    (row === 1 && (col === 1 || col === 5)) ||
                    (row === 3 && (col === 0 || col === 3 || col === 6)) ||
                    (row === 5 && (col === 1 || col === 5)) ||
                    (row === 6 && col === 3);

                const isCurentRowColCrossCell =
                    (currentRow === 0 && currentCol === 3) ||
                    (currentRow === 1 && (currentCol === 1 || currentCol === 5)) ||
                    (currentRow === 3 && (currentCol === 0 || currentCol === 3 || currentCol === 6)) ||
                    (currentRow === 5 && (currentCol === 1 || currentCol === 5)) ||
                    (currentRow === 6 && currentCol === 3);

                console.log({ isCrossCell, oldCoin, movedCoin, row, col })
                // same player coin should not capture, it can stack up at crosscell
                if (!isCrossCell) {
                    if (oldCoin && (oldCoin === movedCoin)) {
                        console.log('sameplayer coin')
                        // remove old coin selection if it was same coin
                        if (currentRow === row && currentCol === col) {
                            setSelected(null);
                            setCurrentRow(null);
                            setCurrentCol(null);
                        }
                        return
                    }
                }

                console.log("toPalce", newBoardState[row][col])
                console.log("formPalce", newBoardState[currentRow][currentCol])

                // Move the coin from the source cell to the target cell
                newBoardState[currentRow][currentCol].isCoin = isCurentRowColCrossCell ? activePlayer : null;
                if (movedCoin === 'red') {
                    newBoardState[currentRow][currentCol].redCoinCount = newBoardState[currentRow][currentCol].redCoinCount > 0 ? newBoardState[currentRow][currentCol].redCoinCount - 1 : 0
                    newBoardState[row][col].redCoinCount = newBoardState[row][col].redCoinCount + 1
                } else if (movedCoin === 'blue') {
                    newBoardState[currentRow][currentCol].blueCoinCount = newBoardState[currentRow][currentCol].blueCoinCount > 0 ? newBoardState[currentRow][currentCol].blueCoinCount - 1 : 0
                    newBoardState[row][col].blueCoinCount = newBoardState[row][col].blueCoinCount + 1
                }
                newBoardState[row][col].isCoin = isCrossCell ? activePlayer : movedCoin;


                // Update the board state
                setTimeout(() => {
                    setBoardState(newBoardState);
                    setSelected(null);
                    setCurrentRow(null);
                    setCurrentCol(null);
                }, 0)

                // shoudn't capture for crossCell
                if (!isCrossCell) {
                    if (oldCoin && !(oldCoin === movedCoin)) {
                        coinCapture(oldCoin)
                        return // capture player will do one more move
                    }
                }
                setTimeout(() => {
                    console.log("setTimeout", { diceResult })
                    if (diceResult && ![1, 5, 6, 12].includes(diceResult)) {
                        console.log("switchPlayer from handler changed")
                        switchPlayer()
                    }
                }, 800)

            }
        } else {
            // If no coin is selected, select the current cell
            if (isCoin && isCoin === activePlayer) {
                setSelected(isCoin);
                setCurrentRow(row);
                setCurrentCol(col);
                console.log("selectedPlace", boardState[row][col])
            }
        }

    };

    return (
        <div className="grid grid-rows-7 grid-cols-7 ">
            {boardState.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center items-center flex-col">
                    {row.map((cell, colIndex) => (
                        <Cell
                            key={colIndex}
                            row={rowIndex}
                            col={colIndex}
                            isCoin={cell.isCoin}
                            redCoinCount={cell.redCoinCount}
                            blueCoinCount={cell.blueCoinCount}
                            onMoveCoin={onMoveCoin}
                            activePlayer={activePlayer}
                            currentRow={currentRow}
                            currentCol={currentCol}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;
