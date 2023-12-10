// App.tsx

import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './Board';
import Dice from './Dice';
import Player from './Player';

function App() {
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [redPlayerCoins, setRedPlayerCoins] = useState<number>(5);
  const [bluePlayerCoins, setBluePlayerCoins] = useState<number>(5);
  const [activePlayer, setActivePlayer] = useState<string>('red');
  const [timer, setTimer] = useState<number>(10);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        switchPlayer();
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer, activePlayer]);

  const handleDiceRoll = (result: number) => {
    
    // reset to null for 2nd time got 1
    setDiceResult(null);

    if (activePlayer === 'red' && redPlayerCoins > 0 && result === 1) {
      setTimeout( ()=>{
        setDiceResult(1);
        setRedPlayerCoins((prevCoins) => prevCoins - 1);
      })
    } else if (activePlayer === 'blue' && bluePlayerCoins > 0 && result === 1) {
      setTimeout( ()=>{
        setBluePlayerCoins((prevCoins) => prevCoins - 1);
        setDiceResult(1);
      })
    }

    // Reset the timer when the dice is rolled
    setTimer(10);
  };

  const switchPlayer = () => {
    setActivePlayer((prevPlayer) => (prevPlayer === 'red' ? 'blue' : 'red'));
    setTimer(10);
  };

  const coinCapture = (capturePlayer: string) => {
    if (capturePlayer === null) return

    if (capturePlayer === 'red' && redPlayerCoins < 5) {
      setRedPlayerCoins((prevCoins) => prevCoins + 1);
    } else if (capturePlayer === 'blue' && bluePlayerCoins < 5) {
      setBluePlayerCoins((prevCoins) => prevCoins + 1);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex">
        <Board activePlayer={activePlayer} diceResult={diceResult} coinCapture={coinCapture} />
        <div className="ml-4">
          <Dice onRoll={handleDiceRoll} activePlayer={activePlayer} />
          <Player color="red" coins={redPlayerCoins} />
          <Player color="blue" coins={bluePlayerCoins} />
          <div className={`mt-4 text-${activePlayer}-500`}>{`${activePlayer.toUpperCase()} Player's Turn`}</div>
          <div className="mt-2">{`Time left: ${timer} seconds`}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
