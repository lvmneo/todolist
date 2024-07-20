import React from 'react';
import ComplexityLevels from '../components/ComplexityLevels';
import { useTodoStore } from '../store/useTodoStore';


const TodoInput: React.FC = () => {
  const {
    task, projectName, complexity,
    selectedDay, color, addTodo,
    setTask, setProjectName, setComplexity,
    setSelectedDay, setColor
  } = useTodoStore();

  
  
  return (
  <div className="input-container">
    <header>
      <div className="complexity-input">
        <ComplexityLevels
          complexity={complexity}
          setComplexity={setComplexity}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          color={color}
          setColor={setColor}
        />
      </div>

      <div className="task-input">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add new tasks"
        />
      </div>
    
      <div className="project-name-input">
      <button className="add-btn" onClick={addTodo}>+</button>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project name"
        />
      </div>

    </header>
  </div>
);
};

export default TodoInput;