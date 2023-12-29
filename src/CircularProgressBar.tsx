// CircularProgressBar.js
import React from 'react';

interface CircularProgressBar {
  percentage:number,
  activePlayer: string
}

const CircularProgressBar: React.FC<CircularProgressBar> = ({ percentage,activePlayer}) => {
  const strokeWidth = 5;
  const radius = 30;
  const viewBoxSize = radius * 2 + strokeWidth * 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = ((100 - ((percentage/30)*100)) / 100) * circumference;

  return (
    <svg
      className="w-10 h-10 mt-4"
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className={`stroke-current text-white`}
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={radius + strokeWidth}
        cy={radius + strokeWidth}
      />
      <circle
        className={`stroke-current  ${activePlayer ==='red' ? 'text-red-500' : 'text-blue-500' } `}
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={radius + strokeWidth}
        cy={radius + strokeWidth}
        style={{
          strokeDasharray: `${circumference} ${circumference}`,
          strokeDashoffset: progressOffset,
        }}
      />
      <text
        className={`text-center ${activePlayer ==='red' ? 'text-red-500' : 'text-blue-500' } text-l`}
        x="33%"
        y="50%"
        dy=".3em"
      >
        {percentage}s
      </text>
    </svg>
  );
};

export default CircularProgressBar;
