import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import deleteIcon from './images/btndel.png';
import addIcon from './images/btnadd.png';

import './App.css';

interface ITodo {
  id: number;
  text: string;
  projectName: string;

}



  
  const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<ITodo[]>([]); // Состояние для списка 
    const [done, setDone] = useState<ITodo[]>([]);// Состояние для списка выполненных заметок
    const [task, setTask] = useState<string>(''); // Состояние для текущего текста новой заметки
    const [projectName, setProjectName] = useState('');

   // Функция для добавления новой заметки
    const addTodo = (): void => {
      if (!task || !projectName) return;// Если текст заметки пуст, ничего не делаем
      const newTask: ITodo = { id: Date.now(), text: task,projectName: projectName};// Создаем новую заметку
      setTodos([...todos, newTask]);// Добавляем заметку в список
      setTask('');// Очищаем поле ввода
      setProjectName('');
    };
  

    // Функция для пометки заметки как выполненной
    const markAsDone = (id: number): void => {
      const taskToMove = todos.find(todo => todo.id === id); // Находим заметку по ID
      if (taskToMove) {
        setDone([...done, taskToMove]);// Добавляем заметку в список выполненных
        setTodos(todos.filter(todo => todo.id !== id));// Удаляем заметку из списка 
      }
    };

  // Функция для возврата заметки в список невыполненных
    const markAsTodo = (id: number): void => {
      const taskToMove = done.find(doneTask => doneTask.id === id);
      if (taskToMove) {
        setTodos([...todos, taskToMove]);
        setDone(done.filter(doneTask => doneTask.id !== id));
      }
    };

// Функция для удаления заметки из списка
    const deleteTask = (id: number, isDone: boolean): void => {
      if (isDone) {
        setDone(done.filter(doneTask => doneTask.id !== id));
      } else {
        setTodos(todos.filter(todo => todo.id !== id));
      }
    };
    
   

  return (
    
      <div className="todo-container">
        <h1>TO-DO LIST</h1>
        <div className="input-container">
        
        <header>
      
        <div className="task-input">
        
        <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="New tasks"
          /></div>
           
           <div className="project-name-input">
           <button className ="add-btn" onClick={addTodo}>Add</button>
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
              <li key={todo.id} onClick={() => markAsDone(todo.id)}>
              <img
               src={deleteIcon}
                 alt="Удалить"
                  className="delete-btn"
                  onClick={(event) => {
          event.stopPropagation(); // Это предотвратит всплытие события
          deleteTask(todo.id, false);
              }}
      />
                <div className= "Task" > {todo.text}</div>
               
                <div className="project-name">
                {todo.projectName}
                </div>
              
              </li>
            ))}
          </ul>
        </div>
        <div className="dones">
          <h2>DONE</h2>
          <ul>
            {done.map((doneTask) => (
              <li key={doneTask.id} onClick={() => markAsTodo(doneTask.id)}>
                 <img
src={deleteIcon}
alt="Удалить"
className="delete-btn"
onClick={(event) => {
event.stopPropagation(); // Это предотвратит всплытие события
deleteTask(doneTask.id, true);
 }}
      />
                <div className= "Task" > {doneTask.text} </div>
                <div className="project-name">
                {doneTask.projectName}
                </div>
                
               
              </li>
            ))}
          </ul>
        </div>
      </div>
  );

};

export default TodoApp;
