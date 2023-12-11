// App.tsx

import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './Board';
import Dice from './Dice';
import Player from './Player';
import CircularProgressBar from './CircularProgressBar';
import LoadingScreen from './LoadingScreen';

function App() {
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [redPlayerCoins, setRedPlayerCoins] = useState<number>(5);
  const [bluePlayerCoins, setBluePlayerCoins] = useState<number>(5);
  const [activePlayer, setActivePlayer] = useState<string>('red');
  const [timer, setTimer] = useState<number>(30);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const mql = window.matchMedia("(orientation: portrait)");
      // If there are matches, we're in portrait
      if (mql.matches) {
        setIsLoading(true);
        resetGame()
      } else {
        setIsLoading(false);
        resetGame()
      }
    });
  }, []);  

  const resetGame = () => {
    setTimer(30)
    setBluePlayerCoins(5)
    setRedPlayerCoins(5)
  }

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

    if (activePlayer === 'red' && redPlayerCoins === 5) {
      if (![1, 5, 6, 12].includes(result)) {
        setActivePlayer('blue')
        // Reset the timer when the dice is rolled
        setTimer(30);
        return
      }
    }
    if (activePlayer === 'blue' && bluePlayerCoins === 5) {
      if (![1, 5, 6, 12].includes(result)) {
        setActivePlayer('red')
        // Reset the timer when the dice is rolled
        setTimer(30);
        return
      }
    }

    if (activePlayer === 'red' && redPlayerCoins > 0 && result === 1) {
      // reset to null for 2nd time got 1
      setDiceResult(null);
      setTimeout(() => {
        setRedPlayerCoins((prevCoins) => prevCoins - 1);
        setDiceResult(1);
      })
      setTimeout(() => {setDiceResult(null)},500)
    } else if (activePlayer === 'blue' && bluePlayerCoins > 0 && result === 1) {
      // reset to null for 2nd time got 1
      setDiceResult(null);
      setTimeout(() => {
        setBluePlayerCoins((prevCoins) => prevCoins - 1);
        setDiceResult(1);
        setTimeout(() => {setDiceResult(null)},500)
      })
    } else {
      setDiceResult(result);
    }

    // Reset the timer when the dice is rolled
    setTimer(30);
  };

  const switchPlayer = () => {
    setActivePlayer((prevPlayer) => (prevPlayer === 'red' ? 'blue' : 'red'));
    setTimer(30);
  };

  const coinCapture = (capturePlayer: string) => {
    if (capturePlayer === null) return

    console.log("capturePlayer", capturePlayer)
    if (capturePlayer === 'red' && redPlayerCoins < 5) {
      setRedPlayerCoins((prevCoins) => prevCoins + 1);
    } else if (capturePlayer === 'blue' && bluePlayerCoins < 5) {
      setBluePlayerCoins((prevCoins) => prevCoins + 1);
    }
    // Reset the timer for the next round of same player
    setTimer(30)
  }

  const startGame = () => {
    setIsLoading(false);
    setTimer(30)
  };

  return (
    <>
    {isLoading ? (
        <LoadingScreen startGame={startGame} />
      ) : (
    <div className="flex justify-center items-center h-screen">
      <div className="flex">
        <Board activePlayer={activePlayer} diceResult={diceResult} coinCapture={coinCapture} switchPlayer={switchPlayer} />
        <div className="ml-4 flex flex-col justify-center items-center">
          <Player color="red" coins={redPlayerCoins} />
          <Dice onRoll={handleDiceRoll} activePlayer={activePlayer} />
          <Player color="blue" coins={bluePlayerCoins} />
          <CircularProgressBar percentage={timer} activePlayer={activePlayer} />
        </div>
      </div>
    </div>)}
    </>
  );
}

export default App;