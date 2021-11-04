const Connection = require('./Connection');

const createTask = async (task, {formDate, creationDate}, taskStatus) => Connection()
.then((db) => db.collection('tasks').insertOne({ task, creationDate: new Date(formDate), taskStatus }))
.then((result) => ({ _id: result.insertedId, task, creationDate, taskStatus }))

const getAll = async () => Connection()
  .then((db) => db.collection('tasks').find().toArray());

module.exports = {
  createTask,
  getAll,
}