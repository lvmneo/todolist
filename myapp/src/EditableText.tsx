//редактирование текста внутри заметок,которые в колонках 

import React, { useState, useEffect } from 'react';
import './css/EditableText.css'

interface EditableTextProps {
  text: string;
  onTextChange: (newText: string) => void;
}

const EditableText: React.FC<EditableTextProps> = ({ text, onTextChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState(text);
  
  useEffect(() => {
    setEditableText(text);
  }, [text]); 

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
  if (newValue !== editableText) { // Добавляем проверку на изменение текста
    setEditableText(newValue);
  }
  };

  const handleBlur = () => {
    onTextChange(editableText);
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleBlur();
    }
  };

  return isEditing ? (
    <input
    className="editable-text"
      type="text"
      value={editableText}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      autoFocus
    />
  ) : (
    <span className="editable-text" onClick={handleTextClick}>
      {text}
    </span>
  );
};

export default EditableText;