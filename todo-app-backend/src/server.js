const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { Todo } = require('./models');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use('/api/todos', routes);


app.get('/api/todos', async (req, res) => {
    try {
      // Получение всех задач из базы данных
      const todos = await Todo.findAll();
      console.log('Задачи получены:', todos);
      // Отправка списка задач клиенту со статусом 200 (OK)
      res.status(200).json(todos);
    } catch (error) {
      // Логирование ошибки и отправка сообщения об ошибке клиенту со статусом 500 (Internal Server Error)
      console.error('Ошибка при получении задач:', error);
      res.status(500).send('Ошибка на сервере');
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.use(express.static('public'));

//http://localhost:8000/api/todos