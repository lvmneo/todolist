import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { DoneIcon, TodoIcon } from './components/Icons';
import './css/ComplexityLevels.css'
import './css/App.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { useTodoStore } from './store/useTodoStore';

interface ITodo {
  id: number;
  text: string;
  projectName: string;
  complexity: number;
  selectedDay: string;
  color: string;
}

const TodoApp: React.FC = () => {
  const {
    todos, done, fetchTodos,
    markAsDoneOrTodo, deleteTask,
    updateTaskComplexity, updateTaskSelectedDay,
    updateTaskColor, updateTaskText
  } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="todo-container">
      <h1>TO-DO LIST</h1>
      <TodoInput />
      <div className="todos">
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
      </div>
      <div className="dones">
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
      </div>
    </div>
  );
};

export default TodoApp;