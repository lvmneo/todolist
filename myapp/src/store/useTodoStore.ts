import { create } from 'zustand'
import axios from 'axios';
import '../css/App.css';

export interface ITodo {
  id: number;
  text: string;
  projectName: string;
  complexity: number;
  selectedDay: string;
  color: string;
  status: string;
}

export interface TodoStore {
  todos: ITodo[];
  done: ITodo[];
  task: string;
  projectName: string;
  complexity: number;
  selectedDay: string;
  color: string;
  fetchTodos: () => Promise<void>;
  addTodo: () => Promise<void>;
  markAsDoneOrTodo: (id: number) => void;
  deleteTask: (id: number, isDone: boolean) => Promise<void>;
  updateTaskComplexity: (id: number, complexity: number) => void;
  updateTaskSelectedDay: (id: number, selectedDay: string) => void;
  updateTaskColor: (id: number, color: string) => void;
  updateTaskText: (id: number, newText: string) => void;
  setTask: (task: string) => void;
  setProjectName: (projectName: string) => void;
  setComplexity: (complexity: number) => void;
  setSelectedDay: (selectedDay: string) => void;
  setColor: (color: string) => void;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  done: [],
  task: '',
  projectName: '',
  complexity: 0,
  selectedDay: '',
  color: 'rgba(228, 44, 95, 1)',

  fetchTodos: async () => {
    try {
      const response = await axios.get<ITodo[]>('http://localhost:8000/');
      const allTodos = response.data;
      const todos = allTodos.filter(todo => todo.status === 'TODO');
      const done = allTodos.filter(todo => todo.status === 'DONE');
      set({ todos, done });
    } catch (error) {
      console.error(error);
    }
  },

  addTodo: async () => {
    const { task, projectName, complexity, selectedDay, color, todos } = get();
    if (!task || !projectName) return;

    const newTask: ITodo = { id: Date.now(), text: task, projectName, complexity, selectedDay, color,status: 'TODO' };
    try {
      const response = await axios.post('http://localhost:8000/', newTask);
      if (response.status === 201) {
        set({ todos: [...todos, response.data] });
      }
    } catch (error) {
      console.error(error);
    }
    set({ 
      todos: [...todos, newTask],
      task: '',
      projectName: '',
      complexity: 0,
      selectedDay: '',
      color: 'rgba(228, 44, 95, 1)'
    });
  },

  markAsDoneOrTodo: async (id: number) => {
    const { todos, done } = get();
    const taskToMove = todos.find(todo => todo.id === id) || done.find(doneTask => doneTask.id === id);
    if (!taskToMove) return;

    const newStatus = taskToMove.status === 'TODO' ? 'DONE' : 'TODO';
    try {
      await axios.put(`http://localhost:8000/${id}`, { status: newStatus });
      if (newStatus === 'DONE') {
        set({
          done: [...done, { ...taskToMove, status: 'DONE' }],
          todos: todos.filter(todo => todo.id !== id)
        });
      } else {
        set({
          todos: [...todos, { ...taskToMove, status: 'TODO' }],
          done: done.filter(doneTask => doneTask.id !== id)
        });
      }
    } catch (error) {
      console.error(error);
    }
  },

  deleteTask: async (id: number, isDone: boolean) => {
    const { todos, done } = get();
    try {
      await axios.delete(`http://localhost:8000/${id}`);
      if (isDone) {
        set({ done: done.filter(doneTask => doneTask.id !== id) });
      } else {
        set({ todos: todos.filter(todo => todo.id !== id) });
      }
    } catch (error) {
      console.error(error);
    }
  },
  updateTaskComplexity: (id: number, complexity: number) => {
    const { todos, done } = get();
    set({
      todos: todos.map(todo => (todo.id === id ? { ...todo, complexity } : todo)),
      done: done.map(doneTask => (doneTask.id === id ? { ...doneTask, complexity } : doneTask))
    });
  },

  updateTaskSelectedDay: (id: number, selectedDay: string) => {
    const { todos, done } = get();
    set({
      todos: todos.map(todo => (todo.id === id ? { ...todo, selectedDay } : todo)),
      done: done.map(doneTask => (doneTask.id === id ? { ...doneTask, selectedDay } : doneTask))
    });
  },

  updateTaskColor: (id: number, color: string) => {
    const { todos, done } = get();
    set({
      todos: todos.map(todo => (todo.id === id ? { ...todo, color } : todo)),
      done: done.map(doneTask => (doneTask.id === id ? { ...doneTask, color } : doneTask))
    });
  },

  updateTaskText: (id: number, newText: string) => {
    const { todos, done } = get();
    set({
      todos: todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo)),
      done: done.map(doneTask => (doneTask.id === id ? { ...doneTask, text: newText } : doneTask))
    });
  },

  setTask: (task: string) => set({ task }),
  setProjectName: (projectName: string) => set({ projectName }),
  setComplexity: (complexity: number) => set({ complexity }),
  setSelectedDay: (selectedDay: string) => set({ selectedDay }),
  setColor: (color: string) => set({ color })
}));