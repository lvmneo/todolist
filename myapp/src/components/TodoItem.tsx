import React from 'react';
import ComplexityLevels from '../components/ComplexityLevels';
import EditableText from '../components/EditableText';
import deleteIcon from '../images/btndel.png';
import '../css/App.css';



interface ITodo {
  id:number;
  text: string;
  projectName: string;
  complexity: number;
  selectedDay: string;
  color: string;
}

interface TodoItemProps {
  todos: ITodo;
  deleteTask: (id:number, isDone: boolean) => void;
  markAsDoneOrTodo: (id:number) => void;
  updateTaskComplexity: (id:number, complexity: number) => void;
  updateTaskSelectedDay: (id: number, selectedDay: string) => void;
  updateTaskColor: (id:number, color: string) => void;
  updateTaskText: (id:number, text: string) => void;
  isDone: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todos,
  deleteTask,
  markAsDoneOrTodo,
  updateTaskComplexity,
  updateTaskSelectedDay,
  updateTaskColor,
  updateTaskText,
  isDone,
}) => (
  <li>
  <button
      className="delete-btn"
      onClick={(event) => {
        event.stopPropagation();
        deleteTask(todos.id, isDone);
      }}
    >Х
    </button>
    <div
      className="Task"
      onClick={(event) => {
        if (!(event.target as HTMLElement).classList.contains('editable-text')) {
          markAsDoneOrTodo(todos.id);
        }
      }}
    >
      <EditableText
        text={todos.text}
        onTextChange={(newText) => updateTaskText(todos.id, newText)}
      />
    </div>

    <div className="project-name">{todos.projectName}</div>
    <div className="task-complexity">
      <ComplexityLevels
        complexity={todos.complexity}
        setComplexity={(level) => updateTaskComplexity(todos.id, level)}
        selectedDay={todos.selectedDay}
        setSelectedDay={(day) => updateTaskSelectedDay(todos.id, day)}
        color={todos.color}
        setColor={(color) => updateTaskColor(todos.id, color)}
      />
    </div>
  </li>
);

export default TodoItem;