const Joi = require('joi');
const Tasks = require('../models/Tasks');

const newTaskValidation = Joi.object({
  task: Joi.string().required(),
  creationDate: Joi.string().required(),
  taskStatus: Joi.string().required(),
});

const createTask = async (task, creationDate, taskStatus) => {
  const isValid = newTaskValidation.validate({ task, creationDate, taskStatus });
  if (isValid.error) {
    return { err: "1" };
  }
  return Tasks.createTask(task, creationDate, taskStatus);
};

module.exports = {
  createTask,
};