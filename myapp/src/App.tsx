import React, { useState,useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import axios from 'axios';
import { DoneIcon, TodoIcon } from './components/Icons';
import './css/ComplexityLevels.css'
import './css/App.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { useTodoStore } from './store/useTodoStore';



const TodoApp: React.FC = () => {
  const {
    todos, done, fetchTodos,
    markAsDoneOrTodo, deleteTask,
    updateTaskComplexity, updateTaskSelectedDay,
    updateTaskColor, updateTaskText,onDragEnd
  } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="todo-container">
        <h1>TO-DO LIST</h1>
        <TodoInput />
        <Droppable droppableId="todos">
          {(provided) => (
            <div
              className="todos"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <h2><TodoIcon /> TO-DO</h2>
              <TodoList
                todos={todos}
                deleteTask={deleteTask}
                markAsDoneOrTodo={markAsDoneOrTodo}
                updateTaskComplexity={updateTaskComplexity}
                updateTaskSelectedDay={updateTaskSelectedDay}
                updateTaskColor={updateTaskColor}
                updateTaskText={updateTaskText}
                isDone={false}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="done">
          {(provided) => (
            <div
              className="done"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <h2><DoneIcon /> DONE</h2>
              <TodoList
                todos={done}
                deleteTask={deleteTask}
                markAsDoneOrTodo={markAsDoneOrTodo}
                updateTaskComplexity={updateTaskComplexity}
                updateTaskSelectedDay={updateTaskSelectedDay}
                updateTaskColor={updateTaskColor}
                updateTaskText={updateTaskText}
                isDone={true}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default TodoApp;