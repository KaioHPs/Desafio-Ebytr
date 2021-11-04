const Joi = require('joi')
  .extend(require('@joi/date'));
const Tasks = require('../models/Tasks');
const ErrorList = require('../ErrorList');

const statusOrder = [ 'pendente', 'em andamento', 'pronto' ];

const newTaskValidation = Joi.object({
  task: Joi.string().required(),
  creationDate: Joi.date().format('DD/MM/YYYY').required(),
  taskStatus: Joi.string().valid(...statusOrder).required(),
});

const updateTaskValidation = Joi.object({
  task: Joi.string(),
  taskStatus: Joi.string().valid(...statusOrder).required(),
});

const convertDate = (date) => {
  const dateArray = date.split("/");
  console.log(dateArray);
  const newDate = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`
  return newDate;
}

const createTask = async (task, creationDate, taskStatus) => {
  const isValid = newTaskValidation.validate({ task, creationDate, taskStatus });
  if (isValid.error) {
    return { err: {
        code: 'invalid_data',
        message: isValid.error.details[0].message,
      },
    };
  }
  const formDate = convertDate(creationDate);
  console.log(formDate);
  return Tasks.createTask(task, {formDate, creationDate}, taskStatus);
};

const getAll = async (orderBy) => {
  const allTasks = await Tasks.getAll();
  console.log(allTasks);
  let listedTasks;
  switch (orderBy) {
    case 'date':
      listedTasks = allTasks.sort((a, b) => {
        return a.creationDate - b.creationDate;
      });
      break;
    case 'status':
      listedTasks = allTasks.sort((a, b) => {
        return statusOrder.indexOf(a.taskStatus) >= statusOrder.indexOf(b.taskStatus)
          ? 1 : -1;
      });
      break;
    default:
      listedTasks = allTasks.sort((a, b) => {
        return a.task.toLowerCase() > b.task.toLowerCase() ? 1 : -1;
      });
      break;
  }
  return listedTasks;
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
    if (task) {
      return Tasks.updateTask(id, task, existingTask.creationDate, taskStatus);
    } else {
      return Tasks.updateTask(id, existingTask.task, existingTask.creationDate, taskStatus);
    }
  }
  return ErrorList.idNotFound;
};

module.exports = {
  createTask,
  getAll,
  updateTask,
};