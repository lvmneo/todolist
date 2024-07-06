import React, { useState } from 'react';
import ComplexityLevels from './ComplexityLevels';
import deleteIcon from './images/btndel.png';
import addIcon from './images/btnadd.png';
import './ComplexityLevels.css'
import './App.css';

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
    if (!task || !projectName || !selectedDay) return;
    const newTask: ITodo = { id: Date.now(), text: task, projectName, complexity, selectedDay, color };
    setTodos([...todos, newTask]);
    setTask('');
    setProjectName('');
    setComplexity(0);
    setSelectedDay('');
    setColor('rgba(228, 44, 95, 1)');
  };

  const markAsDone = (id: number): void => {
    const taskToMove = todos.find(todo => todo.id === id);
    if (taskToMove) {
      setDone([...done, taskToMove]);
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const markAsTodo = (id: number): void => {
    const taskToMove = done.find(doneTask => doneTask.id === id);
    if (taskToMove) {
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

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setColor(event.target.value);
  };

  return (
    <div className="todo-container">
      <h1>TO-DO LIST</h1>
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
          <div className="color-picker">
            <label htmlFor="color"></label>
            <select id="color" value={color} onChange={handleColorChange}>
              <option value="rgba(228, 44, 95, 1)">Красный</option>
              <option value="rgba(93, 95, 239, 1)">Голубой</option>
              <option value="rgba(255, 206, 86, 1)">Желтый</option>
            </select>
          </div>
          <div className="task-input">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="New tasks"
            />
          </div>
          <div className="project-name-input">
            <button className="add-btn" onClick={addTodo}>Add</button>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Project name"
            />
          </div>
        </header>
      </div>
      <div className="todos">
        <h2>TO-DO</h2>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <img
                src={deleteIcon}
                alt="Удалить"
                className="delete-btn"
                onClick={(event) => {
                  event.stopPropagation();
                  deleteTask(todo.id, false);
                }}
              />
              <div className="Task" onClick={() => markAsDone(todo.id)}>{todo.text}</div>
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
          ))}
        </ul>
      </div>
      <div className="dones">
        <h2>DONE</h2>
        <ul>
          {done.map((doneTask) => (
            <li key={doneTask.id}>
              <img
                src={deleteIcon}
                alt="Удалить"
                className="delete-btn"
                onClick={(event) => {
                  event.stopPropagation();
                  deleteTask(doneTask.id, true);
                }}
              />
              <div className="Task" onClick={() => markAsTodo(doneTask.id)}>{doneTask.text}</div>
              <div className="project-name">{doneTask.projectName}</div>
              <div className="task-complexity">
                <ComplexityLevels
                  complexity={doneTask.complexity}
                  setComplexity={(level) => updateTaskComplexity(doneTask.id, level)}
                  selectedDay={doneTask.selectedDay}
                  setSelectedDay={(day) => updateTaskSelectedDay(doneTask.id, day)}
                  color={doneTask.color}
                  setColor={(color) => updateTaskColor(doneTask.id, color)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;