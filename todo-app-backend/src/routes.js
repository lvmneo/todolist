const express = require('express');
const { Todo } = require('./models');

// новый экземпляр Router для определения маршрутов
const router = express.Router();

// Маршрут для создания новой задачи
router.post('/api/todos', async (req, res) => {
  try { // Логирование тела запроса
    console.log('Received POST request to /todos with body:', req.body);
    // Создание новой задачи с использованием данных из тела запроса
    const todo = await Todo.create(req.body);
    // Отправка созданной задачи обратно клиенту
    res.json(todo);
  } catch (error) {
     // Логирование ошибки и отправка сообщения об ошибке клиенту
    console.error('Error creating todo:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Маршрут для получения всех задач
router.get('/api/todos', async (req, res) => {
  try {
     // Логирование запроса
    console.log('Received GET request to /todos');
     // Получение всех задач из базы данных
    const todos = await Todo.findAll();
    // Логирование полученных задач
    console.log('Fetched todos:', todos);
     // Проверка наличия задач в базе данных
    if (todos.length === 0) {
      console.warn('No todos found in the database.');
      return res.status(404).json({ error: 'No todos found' });
    }
     // Отправка списка задач клиенту
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Маршрут для обновления задачи по идентификатору
router.put('/api/todos:id', async (req, res) => {
  try {
    console.log(`Received PUT request to /todos/${req.params.id} with body:`, req.body);
    // Поиск задачи по первичному ключу (id)
    const todo = await Todo.findByPk(req.params.id);
     // Проверка наличия задачи
    if (todo) {// Обновление задачи данными из тела запроса
      await todo.update(req.body);
        // Отправка обновленной задачи клиенту
      res.json(todo);
    } else {// Отправка сообщения об ошибке, если задача не найдена
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) { // Логирование ошибки и отправка сообщения об ошибке клиенту
    console.error('Error updating todo:', error.message);
    res.status(500).json({ error: error.message });
  }
});

//Маршрут для удаления задачи по идентификатору
router.delete('/api/todos:id', async (req, res) => {
  try {
    console.log(`Received DELETE request to /todos/${req.params.id}`);
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
      await todo.destroy();
      res.json({ message: 'Todo deleted' });
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    console.error('Error deleting todo:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;