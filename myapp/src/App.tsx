import React, { useState } from 'react';

import { DoneIcon, TodoIcon } from './Icons';
import './css/ComplexityLevels.css'
import './css/App.css';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

interface ITodo {
  id: number;
  text: string;
  projectName: string;
  complexity: number;
  selectedDay: string;
  color: string;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [done, setDone] = useState<ITodo[]>([]);
  const [task, setTask] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('');
  const [complexity, setComplexity] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [color, setColor] = useState<string>('rgba(228, 44, 95, 1)');

  const addTodo = (): void => {
    if (!task || !projectName) return;
    const newTask: ITodo = { id: Date.now(), text: task, projectName, complexity, selectedDay, color };
    setTodos([...todos, newTask]);
    setTask('');
    setProjectName('');
    setComplexity(0);
    setSelectedDay('');
    setColor('rgba(228, 44, 95, 1)');
  };

  const markAsDoneOrTodo = (id: number): void => {
    const taskToMove = todos.find(todo => todo.id === id) || done.find(doneTask => doneTask.id === id);
    if (!taskToMove) return;

    if (todos.includes(taskToMove)) {
      setDone([...done, taskToMove]);
      setTodos(todos.filter(todo => todo.id !== id));
    } else {
      setTodos([...todos, taskToMove]);
      setDone(done.filter(doneTask => doneTask.id !== id));
    }
  };

  const deleteTask = (id: number, isDone: boolean): void => {
    if (isDone) {
      setDone(done.filter(doneTask => doneTask.id !== id));
    } else {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const updateTaskComplexity = (id: number, complexity: number): void => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, complexity } : todo)));
    setDone(done.map(doneTask => (doneTask.id === id ? { ...doneTask, complexity } : doneTask)));
  };

  const updateTaskSelectedDay = (id: number, selectedDay: string): void => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, selectedDay } : todo)));
    setDone(done.map(doneTask => (doneTask.id === id ? { ...doneTask, selectedDay } : doneTask)));
  };

  const updateTaskColor = (id: number, color: string): void => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, color } : todo)));
    setDone(done.map(doneTask => (doneTask.id === id ? { ...doneTask, color } : doneTask)));
  };

 
  const updateTaskText = (id: number, newText: string): void => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo)));
    setDone(done.map(doneTask => (doneTask.id === id ? { ...doneTask, text: newText } : doneTask)));
  };
  return (
    <div className="todo-container">
      <h1>TO-DO LIST</h1>
      <TodoInput
        task={task}
        setTask={setTask}
        projectName={projectName}
        setProjectName={setProjectName}
        complexity={complexity}
        setComplexity={setComplexity}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        color={color}
        setColor={setColor}
        addTodo={addTodo}
      />
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