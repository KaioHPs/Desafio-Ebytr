const Joi = require('joi');
const Tasks = require('../models/Tasks');
const ErrorList = require('../ErrorList');

const statusOrder = [ 'pendente', 'em andamento', 'pronto' ];

const newTaskValidation = Joi.object({
  task: Joi.string().required(),
  taskStatus: Joi.string().valid(...statusOrder).required(),
});

const updateTaskValidation = Joi.object({
  task: Joi.string(),
  taskStatus: Joi.string().valid(...statusOrder).required(),
});

const convertDate = (date) => {
  const newDate = date.toLocaleDateString('pt-br');
  return newDate;
}

const createTask = async (task, taskStatus) => {
  const isValid = newTaskValidation.validate({ task, taskStatus });
  if (isValid.error) {
    return { err: {
        code: 'invalid_data',
        message: isValid.error.details[0].message,
      },
    };
  }
  const newTask = await Tasks.createTask(task, taskStatus);
  return {...newTask, creationDate: convertDate(newTask.creationDate)}
};

const getAll = async (orderBy) => {
  const allTasks = await Tasks.getAll();
  let sortedTask;
  switch (orderBy) {
    case 'date':
      sortedTask = allTasks.sort((a, b) => {
        return a.creationDate - b.creationDate;
      });
      break;
    case 'status':
      sortedTask = allTasks.sort((a, b) => {
        return statusOrder.indexOf(a.taskStatus) >= statusOrder.indexOf(b.taskStatus)
          ? 1 : -1;
      });
      break;
    default:
      sortedTask = allTasks.sort((a, b) => {
        return a.task.toLowerCase() > b.task.toLowerCase() ? 1 : -1;
      });
      break;
  }
  const finalTaskList = sortedTask.map((t) => ({
      ...t,
      creationDate: convertDate(t.creationDate),
      ...(t.lastUpdate && { lastUpdate: convertDate(t.lastUpdate) })
  }))
  return finalTaskList;
}

const updateTask = async (id, task, taskStatus) => {
  const isValid = updateTaskValidation.validate({ task, taskStatus });
  if (isValid.error) {
    return { err: {
        code: 'invalid_data',
        message: isValid.error.details[0].message,
      },
    };
  }
  const existingTask = await Tasks.getById(id);
  if (existingTask) {
      const updatedTask = task ? await Tasks.updateTask(id, task, existingTask.creationDate, taskStatus)
      : await Tasks.updateTask(id, existingTask.task, existingTask.creationDate, taskStatus);
      return {
        ...updatedTask,
        creationDate: convertDate(updatedTask.creationDate),
        lastUpdate:convertDate(updatedTask.lastUpdate),
      }
  }
  return ErrorList.idNotFound;
};

const deleteTask = async (id) => {
  const existingTask = await Tasks.getById(id);
  if (existingTask) {
    await Tasks.deleteTask(id);
    return {
      message: 'Task deleted successfully',
      deletedTask: {
        ...existingTask,
        creationDate: convertDate(existingTask.creationDate),
        ...(existingTask.lastUpdate && { lastUpdate: convertDate(existingTask.lastUpdate) }),
      },
    };
  }
  return ErrorList.idNotFound;
};

module.exports = {
  createTask,
  getAll,
  updateTask,
  deleteTask,
};