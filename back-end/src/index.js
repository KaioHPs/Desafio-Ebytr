const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Tasks = require('./controllers/Tasks');
const errorMiddleware = require('./middlewares/Error');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.post('/tasks', Tasks.createTask);
app.get('/tasks', Tasks.getAll);
app.put('/tasks/:id', Tasks.updateTask);
app.delete('/tasks/:id', Tasks.deleteTask);

app.use(errorMiddleware);

const PORT = process.env.PORT || '3001';

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
