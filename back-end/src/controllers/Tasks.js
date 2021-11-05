const rescue = require('express-rescue');
const Tasks = require('../services/Tasks');

const createTask = rescue(async (req, res, next) => {
  const { task, taskStatus } = req.body;
  const newTask = await Tasks.createTask(task, taskStatus);
  if (newTask.err) return next(newTask.err);

  return res.status(201).json(newTask);
});

const getAll = rescue(async (req, res, _next) => {
  const { orderBy } = req.body;
  const allTasks = await Tasks.getAll(orderBy);
  console.log(allTasks);

  return res.status(200).json(allTasks);
});

const updateTask = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { task, taskStatus } = req.body;
  const updatedTask = await Tasks.updateTask(id, task, taskStatus);
  console.log(updatedTask);
  if (updatedTask.err) return next(updatedTask.err);
  return res.status(200).json(updatedTask);
});

const deleteTask = rescue(async (req, res, next) => {
  const { id } = req.params;
  const deletedTask = await Tasks.deleteTask(id);
  if (deletedTask.err) return next(deletedTask.err);
  return res.status(200).json(deletedTask);
});

module.exports = {
  createTask,
  getAll,
  updateTask,
  deleteTask,
};