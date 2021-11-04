const rescue = require('express-rescue');
const Tasks = require('../services/Tasks');

const createTask = rescue(async (req, res, next) => {
  const { task, creationDate, taskStatus } = req.body;
  const newTask = await Tasks.createTask(task, creationDate, taskStatus);
  if (newTask.err) return next(newTask.err);

  return res.status(201).json(newTask);
});

const getAll = rescue(async (req, res, _next) => {
  const { orderBy } = req.body;
  const allTasks = await Tasks.getAll(orderBy);

  return res.status(200).json(allTasks);
});

module.exports = {
  createTask,
  getAll,
};