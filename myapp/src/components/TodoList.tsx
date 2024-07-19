import React from 'react';
import TodoItem from '../components/TodoItem';
import { Draggable } from 'react-beautiful-dnd';


interface ITodo {
  id: number;
  text: string;
  projectName: string;
  complexity: number;
  selectedDay: string;
  color: string;
  status: string;
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
  todos, deleteTask, markAsDoneOrTodo,
  updateTaskComplexity, updateTaskSelectedDay,
  updateTaskColor, updateTaskText, isDone
}) => {
  return (
    <ul>
      {todos.map((todos, index) => (
        <Draggable key={todos.id} draggableId={todos.id.toString()} index={index}>
          {(provided) => (
            <div 
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TodoItem
                todos={todos}
                deleteTask={deleteTask}
                markAsDoneOrTodo={markAsDoneOrTodo}
                updateTaskComplexity={updateTaskComplexity}
                updateTaskSelectedDay={updateTaskSelectedDay}
                updateTaskColor={updateTaskColor}
                updateTaskText={updateTaskText}
                isDone={isDone}
              />
            </div>
          )}
        </Draggable>
      ))}
    </ul>
  );
};

export default TodoList;