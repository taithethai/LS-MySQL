const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://taithethai:GGGGGallLOWERcase@localhost:3306/todos');

const app = express();
app.use(bodyParser.json());

const TodoList = sequelize.define('list', {
  task: {
    type: Sequelize.STRING,
  },
  complete: {
    type: Sequelize.BOOLEAN,
  },
});

// TodoList.sync().then(() => {
//   return TodoList.create({
//     task: 'test',
//     complete: false,
//   });
// });

app.get('/', (req, res) => {
  res.send('Welcome to your TodoList app!');
});

app.get('/todos', (req, res) => {
  TodoList.findAll().then((list) => {
    res.send(list);
  });
});

app.post('/todos', (req, res) => {
  TodoList.build({
    task: req.body.task,
    complete: false,
  }).save().then(() => res.send('task saved'));
});

app.put('/todos/:id', (req, res) => {
  TodoList.findById(req.params.id).then((item) => {
    item.complete(req.body.complete)
  });
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
