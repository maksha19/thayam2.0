// Dice.tsx

import React, { useState, useEffect } from 'react';

interface DiceProps {
  onRoll: (result: number) => void;
  activePlayer: string;
}

const Dice: React.FC<DiceProps> = ({ onRoll, activePlayer }) => {
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    if (rolling) {
      const timeoutId = setTimeout(() => {
        const result = Math.floor(Math.random() * 1) + 1;
        console.log(result);
        onRoll(result);
        setRolling(false);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [rolling, onRoll]);

  const rollDice = () => {
    if (!rolling) {
      setRolling(true);
    }
  };

  return (
    <div className={`flex flex-col items-center ${rolling ? `animate-spin` : ''}`}>
      <button
        className={`${activePlayer === "red" ? "bg-red-500" : "bg-blue-500"} text-white p-2 rounded-md cursor-pointer`}
        onClick={rollDice}
      >
        Roll Dice
      </button>
    </div>
  );
};

export default Dice;
