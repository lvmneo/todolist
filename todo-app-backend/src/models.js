const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

const Todo = sequelize.define('Todo', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  complexity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  selectedDay: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.authenticate()
  .then(() => {
    console.log('бд работает');
  })
  .catch(err => {
    console.error('бд не работает :', err);
  });

const initializeDatabase = async () => {
  await sequelize.sync();

  
  await Todo.bulkCreate([
    {
      text: 'buy milk and eggs',
      projectName: 'shop',
      complexity: 1,
      selectedDay: 'Mon',
      color: 'rgba(93, 95, 239, 1)',
    },
    {
      text: 'doing homework',
      projectName: 'study',
      complexity: 2,
      selectedDay: 'Tue',
      color: 'rgba(228, 44, 95, 1)',
    },
    {
      text: 'creat art',
      projectName: 'draw',
      complexity: 3,
      selectedDay: 'Wed',
      color: 'rgba(255, 206, 86, 1)',
    },
  ]);

  console.log('Database & tables created and initialized!');
};

initializeDatabase();

module.exports = {
  Todo,
};