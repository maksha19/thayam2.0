// Player.tsx

import React from 'react';

interface PlayerProps {
  color: string;
  coins: number;
}

const Player: React.FC<PlayerProps> = ({ color, coins }) => {
  return (
    <div className={`w-full min-w-40 h-12 border-2 border-yellow-600 flex items-center justify-center`}>
      {Array.from({ length: coins }, (_, index) => (
        <div
          key={index}
          className={`w-6 h-6 bg-${color}-500 rounded-full mx-1`}
        ></div>
      ))}
    </div>
  );
};

export default Player;
