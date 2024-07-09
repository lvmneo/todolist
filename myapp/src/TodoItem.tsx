import React from 'react';
import ComplexityLevels from './ComplexityLevels';
import EditableText from './EditableText';
import deleteIcon from './images/btndel.png';

interface ITodo {
    id: number;
    text: string;
    projectName: string;
    complexity: number;
    selectedDay: string;
    color: string;
  }

interface TodoItemProps {
  todo: ITodo;
  deleteTask: (id: number, isDone: boolean) => void;
  markAsDoneOrTodo: (id: number) => void;
  updateTaskComplexity: (id: number, complexity: number) => void;
  updateTaskSelectedDay: (id: number, selectedDay: string) => void;
  updateTaskColor: (id: number, color: string) => void;
  updateTaskText: (id: number, text: string) => void; 
  isDone: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  deleteTask,
  markAsDoneOrTodo,
  updateTaskComplexity,
  updateTaskSelectedDay,
  updateTaskColor,
  updateTaskText,
  isDone,
}) => (
  <li>
    <img
      src={deleteIcon}
      alt="Удалить"
      className="delete-btn"
      onClick={(event) => {
        event.stopPropagation();
        deleteTask(todo.id, isDone);
      }}
    />

<div className="Task"onClick={(event) => {if (!(event.target as HTMLElement).classList.contains('editable-text')) {
          markAsDoneOrTodo(todo.id); }}}
    >
       <EditableText
        text={todo.text}
        onTextChange={(newText) => updateTaskText(todo.id, newText)}
      />
    </div>
    
    <div className="project-name">{todo.projectName}</div>
    <div className="task-complexity">
      <ComplexityLevels
        complexity={todo.complexity}
        setComplexity={(level) => updateTaskComplexity(todo.id, level)}
        selectedDay={todo.selectedDay}
        setSelectedDay={(day) => updateTaskSelectedDay(todo.id, day)}
        color={todo.color}
        setColor={(color) => updateTaskColor(todo.id, color)}
      />
    </div>
  </li>
);

export default TodoItem;