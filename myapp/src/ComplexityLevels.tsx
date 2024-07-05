import React, { useState } from 'react';
import { SVGProps } from 'react';
import './ComplexityLevels.css'


const CustomIcon = ({ onClick, fill, ...props }: SVGProps<SVGSVGElement> & { onClick: () => void }) => (
  <svg
      width="45"
      height="45"
      viewBox="0 0 55 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      {...props}
      style={{ cursor: 'pointer',display: 'block' }} // Добавили стиль для лучшего позиционирования
  >
      <path
          d="M0.737061 14.2498H45.856C50.8397 14.2498 54.8797 18.2898 54.8797 23.2735V33.5864C54.8797 37.8582 51.4168 41.3211 47.1451 41.3211H27.8084C12.8573 41.3211 0.737061 29.2008 0.737061 14.2498V14.2498Z"
          fill={fill}
      />
  </svg>
);

const ComplexityLevels = ({ complexity, setComplexity }: { complexity: number; setComplexity: (level: number) => void }) => {
  const handleSetComplexity = (level: number) => {
      console.log('Setting complexity to:', level);
      setComplexity(level === complexity ? 0 : level);
  };

  const getIconColor = (level: number) => {
      return level <= complexity ? 'rgba(228, 44, 95, 1)' : 'rgba(217, 217, 217, 1)';
  };

  return (
      <div style={{ display: 'flex' }}>
          {[1, 2, 3].map((level) => (
              <CustomIcon
                  key={level}
                  onClick={() => handleSetComplexity(level)}
                  fill={getIconColor(level)}
                  className="customIcon"
              />
          ))}
      </div>
  );
};

export default ComplexityLevels;