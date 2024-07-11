const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { Todo } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', require('./routes'));



app.listen(8000, () => {
  console.log('Server is running on port 8000');
});


app.get('/', async (req, res) => {
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