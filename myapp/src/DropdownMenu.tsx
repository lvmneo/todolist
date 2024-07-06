import React from 'react';
import './DropdownMenu.css';

interface DropdownMenuProps {
  selectedDay: string;
  setSelectedDay: (day: string) => void;
  onClose: () => void; 
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ selectedDay, setSelectedDay, onClose }) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDayClick = (day: string) => {
    setSelectedDay(day);
    onClose(); 
  };

  return (
    <div className="dropdown-menu">
      {daysOfWeek.map(day => (
        <button
          key={day}
          className={`day-button ${selectedDay === day ? 'selected' : ''}`}
          onClick={() => handleDayClick(day)}
        >
          {day}
        </button>
      ))}
    </div>
  );
};

export default DropdownMenu;