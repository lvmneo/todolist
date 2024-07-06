import React, { useState } from 'react';
import { SVGProps } from 'react';
import './ComplexityLevels.css';
import DropdownMenu from './DropdownMenu';

interface ComplexityLevelsProps {
  complexity: number;
  setComplexity: (level: number) => void;
  selectedDay: string;
  setSelectedDay: (day: string) => void;
  color: string;
  setColor: (color: string) => void;
}

interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  onClick: () => void;
  fill: string;
}

const CustomIcon: React.FC<CustomIconProps> = ({ onClick, fill, ...props }) => (
  <svg
    width="45"
    height="45"
    viewBox="0 0 55 55"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    {...props}
  >
    <path d="M0.737061 14.2498H45.856C50.8397 14.2498 54.8797 18.2898 54.8797 23.2735V33.5864C54.8797 37.8582 51.4168 41.3211 47.1451 41.3211H27.8084C12.8573 41.3211 0.737061 29.2008 0.737061 14.2498V14.2498Z" fill={fill} />
  </svg>
);

interface DayButtonProps extends React.SVGProps<SVGSVGElement> {
  onClick: () => void;
  fill: string;
}

const DayButton: React.FC<DayButtonProps> = ({ onClick, fill, ...props }) => (
  <svg
    width="48"
    height="35"
    viewBox="0 0 48 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    {...props}
  >
    <rect width="48" height="35" rx="8" fill={fill} />
    <path d="M8.99219 23H10.8125V14.9844H10.8672L14.1172 23H15.4844L18.7344 14.9844H18.7969V23H20.6094V11.7266H18.2812L14.8281 20.3359H14.7734L11.3203 11.7266H8.99219V23ZM26.0703 23.1641C28.5 23.1641 30.0781 21.5469 30.0781 18.8594V18.8438C30.0781 16.1719 28.4766 14.5469 26.0625 14.5469C23.6562 14.5469 22.0625 16.1875 22.0625 18.8438V18.8594C22.0625 21.5391 23.6328 23.1641 26.0703 23.1641ZM26.0781 21.5938C24.8359 21.5938 24.0469 20.6016 24.0469 18.8594V18.8438C24.0469 17.125 24.8516 16.125 26.0625 16.125C27.2969 16.125 28.0938 17.1172 28.0938 18.8438V18.8594C28.0938 20.5938 27.3047 21.5938 26.0781 21.5938ZM31.3281 23H33.2734V18.1953C33.2734 17 33.9844 16.1875 35.1016 16.1875C36.2109 16.1875 36.7578 16.8516 36.7578 18.0312V23H38.7031V17.6406C38.7031 15.7188 37.6641 14.5469 35.8438 14.5469C34.5859 14.5469 33.7422 15.125 33.3125 16.0156H33.2734V14.7188H31.3281V23Z" fill="white" />
  </svg>
);

const ComplexityLevels: React.FC<ComplexityLevelsProps> = ({ complexity, setComplexity, selectedDay, setSelectedDay, color, setColor }) => {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const handleSetComplexity = (level: number) => {
    setComplexity(complexity === level ? level - 1 : level);
  };

  const handleDayClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleCloseDropdown = () => {
    setDropdownVisible(false);
  };

  const getIconColor = (level: number) => {
    return level <= complexity ? color : 'rgba(217, 217, 217, 1)';
  };

  const dayButtonColor = selectedDay ? color : 'rgba(217, 217, 217, 1)';

  return (
    <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      <DayButton onClick={handleDayClick} fill={dayButtonColor} />
      {dropdownVisible && (
        <DropdownMenu
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          onClose={handleCloseDropdown}
        />
      )}
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