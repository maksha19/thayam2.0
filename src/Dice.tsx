// Dice.tsx

import React, { useState, useEffect } from 'react';

interface DiceProps {
  onRoll: (result: number) => void;
  activePlayer: string;
}

const Dice: React.FC<DiceProps> = ({ onRoll, activePlayer }) => {
  const [rolling, setRolling] = useState(false);
  const [faceOne, setFaceOne] = useState(0)
  const [faceSecond, setFaceSecond] = useState(0)

  useEffect(() => {
    if (rolling) {
      const timeoutId = setTimeout(() => {
        const face_one = Math.floor(Math.random() * 3);
        const face_two = Math.floor(Math.random() * 3);
        let result = face_one + face_two
        result = result === 0 ? 12 : result
        console.log(result);
        onRoll(result);
        setRolling(false);
        setFaceOne(face_one);
        setFaceSecond(face_two);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [rolling, onRoll]);

  const rollDice = () => {
    if (!rolling) {
      setRolling(true);
    }
  };

  return (
    <div className='flex flex-row'>
      <div className={`flex flex-col m-2 items-center ${rolling ? `animate-spin` : ''}`}>
        <button
          className={`${activePlayer === "red" ? "bg-red-500" : "bg-blue-500"} text-white p-2 w-12 h-12 rounded-md cursor-pointer`}
          onClick={rollDice}
        >
          {faceOne === 0 ? "" : faceOne}
        </button>
      </div>
      <div className={`flex flex-col m-2 items-center ${rolling ? `animate-spin` : ''}`}>
        <button
          className={`${activePlayer === "red" ? "bg-red-500" : "bg-blue-500"} text-white p-2 w-12 h-12 rounded-md cursor-pointer`}
          onClick={rollDice}
        >
          {faceSecond === 0 ? "" : faceSecond}
        </button>
      </div>
    </div>
  );
};

export default Dice;
