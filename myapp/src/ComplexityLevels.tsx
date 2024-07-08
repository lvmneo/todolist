/*уровни сложности,кнопка для выбора дней,цвета*/


import React, { useState } from 'react';
import { SVGProps } from 'react';
import './css/ComplexityLevels.css'
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
   
    viewBox="0 0 24 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    {...props}
  >
    <path d="M0 0.5H20C22.2091 0.5 24 2.29086 24 4.5V9.07143C24 10.965 22.465 12.5 20.5714 12.5H12C5.37258 12.5 0 7.12742 0 0.5Z" fill={fill} />
  </svg>
);
type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
interface DayButtonProps extends React.SVGProps<SVGSVGElement> {
  onClick: () => void;
  day: Weekday;
  fill: string;

}

const DayButton: React.FC<DayButtonProps> = ({ onClick, fill, day, ...props }) => (
  <button className="daybutton" onClick={onClick} style={{ background: fill }}>
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