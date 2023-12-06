// Player.tsx

import React from 'react';

interface PlayerProps {
  color: string;
  coins: number;
}

const Player: React.FC<PlayerProps> = ({ color, coins }) => {
  return (
    <div className="mb-4">
      <div className={`text-lg font-bold mb-2 text-${color}-500`}>{color} Player</div>
      <div className="flex">
        {Array.from({ length: coins }, (_, index) => (
          <div key={index} className={`w-6 h-6 bg-${color}-500 rounded-full mr-2`}></div>
        ))}
      </div>
    </div>
  );
};

export default Player;
