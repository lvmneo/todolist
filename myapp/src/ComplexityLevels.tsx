/*уровни сложности,кнопка для выбора дней,цвета*/


import React, { useState } from 'react';
import { SVGProps } from 'react';
import './ComplexityLevels.css';
import DropdownMenu from './DropdownMenu';
import SvgContent from './SvgContent'
import ColorDropdownMenu from './ColorDropdownMenu';


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
type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
interface DayButtonProps extends React.SVGProps<SVGSVGElement> {
  onClick: () => void;
  day: Weekday;
  fill: string;

}

const DayButton: React.FC<DayButtonProps> = ({ onClick, fill, day, ...props }) => (
  <button onClick={onClick} style={{ background: fill, border: 'none',borderRadius: '10px', padding: 0, }}>
    <SvgContent day={day} {...props} />
  </button>
);

const ComplexityLevels: React.FC<ComplexityLevelsProps> = ({ complexity, setComplexity, selectedDay, setSelectedDay, color, setColor }) => {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [colorDropdownVisible, setColorDropdownVisible] = useState<boolean>(false);
  const [clicksCount, setClicksCount] = useState<Record<number, number>>({});





  const handleDayClick = () => {
    if (selectedDay) {
      setSelectedDay('');
    } else {
      
      setDropdownVisible(!dropdownVisible);
    }
  };

  const handleComplexityClick = (level: number) => {
    setClicksCount(prevClicksCount => {
      const newClicksCount = { ...prevClicksCount };
      const currentCount = newClicksCount[level] || 0;

      if (currentCount === 1) {
       
        setColorDropdownVisible(true);
        newClicksCount[level] = 0;
      } else {
       
        setComplexity(level);
        newClicksCount[level] = currentCount + 1;
      }

      return newClicksCount;
    });
  };
const handleColorClickClose =() =>{
  setColorDropdownVisible(false);

}
  const handleCloseDropdown = () => {
    setDropdownVisible(false);
  };

  const getIconColor = (level: number) => {
    return level <= complexity ? color : 'rgba(217, 217, 217, 1)';
  };

  const dayButtonColor = selectedDay ? color : 'rgba(217, 217, 217, 1)';

  return (
    <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      <DayButton onClick={handleDayClick} fill={dayButtonColor} day={selectedDay as Weekday} />
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
          onClick={() => handleComplexityClick(level)}
          fill={getIconColor(level)}
          className="customIcon"
        />
      ))}

{colorDropdownVisible && (
        <ColorDropdownMenu
          selectedColor={color}
          setSelectedColor={setColor}
       
          onClose={handleColorClickClose}
        />
      )}
    </div>
    
  );
};

export default ComplexityLevels;