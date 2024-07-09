//меню цвета для приоритета 

import React from 'react';
import './css/ColorDropdownMenu.css';

interface ColorDropdownMenuProps {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  onClose: () => void;
}

const ColorDropdownMenu: React.FC<ColorDropdownMenuProps> = ({ selectedColor, setSelectedColor, onClose }) => {
  const colors = [
    { name: 'Low', value: 'rgba(93, 95, 239, 1)' },
    { name: 'Med', value: 'rgba(255, 206, 86, 1)' },
    { name: 'High', value: 'rgba(228, 44, 95, 1)' },
   
  ];

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    onClose();
  };

  return (
    <div className="color-dropdown-menu">
      {colors.map((color) => (
        <button
          key={color.name}
          className={`color-button ${selectedColor === color.value ? 'selected' : ''}`}
          style={{ backgroundColor: color.value }}
          onClick={() => handleColorClick(color.value)}
        >
          {color.name}
        </button>
      ))}
    </div>
  );
};

export default ColorDropdownMenu;