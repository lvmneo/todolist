import React from 'react';
import TodoItem from './TodoItem';


interface ITodo {
    id: number;
    text: string;
    projectName: string;
    complexity: number;
    selectedDay: string;
    color: string;
  }

interface TodoListProps {
  todos: ITodo[];
  deleteTask: (id: number, isDone: boolean) => void;
  markAsDoneOrTodo: (id: number) => void;
  updateTaskComplexity: (id: number, complexity: number) => void;
  updateTaskSelectedDay: (id: number, selectedDay: string) => void;
  updateTaskColor: (id: number, color: string) => void;
  updateTaskText: (id: number, text: string) => void;
  
  isDone: boolean;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  deleteTask,
  markAsDoneOrTodo,
  updateTaskComplexity,
  updateTaskSelectedDay,
  updateTaskColor,
  updateTaskText,
  isDone,
}) => (


  <ul>
    
    {todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        deleteTask={deleteTask}
        markAsDoneOrTodo={markAsDoneOrTodo}
        updateTaskComplexity={updateTaskComplexity}
        updateTaskSelectedDay={updateTaskSelectedDay}
        updateTaskColor={updateTaskColor}
        updateTaskText={updateTaskText}
        isDone={isDone}
      />
    ))}
  </ul>
);

export default TodoList;