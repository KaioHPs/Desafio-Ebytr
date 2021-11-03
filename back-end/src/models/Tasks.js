const Connection = require('./Connection');

const createTask = async (task, creationDate, taskStatus) => Connection()
.then((db) => db.collection('tasks').insertOne({ task, creationDate, taskStatus }))
.then((result) => ({ _id: result.insertedId, task, creationDate, taskStatus }))

module.exports = {
  createTask,
}