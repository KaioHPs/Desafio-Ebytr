const rescue = require('express-rescue');
const Tasks = require('../services/Tasks');

const createTask = rescue(async (req, res, next) => {
  const { task, creationDate, taskStatus } = req.body;
  const newTask = await Tasks.createTask(task, creationDate, taskStatus);
  if (newTask.err) return next(newTask.err);
  console.log(newTask);

  return res.status(201).json(newTask);
});

module.exports = {
  createTask,
};