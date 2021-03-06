const Connection = require('./Connection');
const { ObjectId } = require('mongodb');

const createTask = async (task, taskStatus) => {
  const creationDate = new Date();
  return Connection()
    .then((db) => db.collection('tasks').insertOne({ task, creationDate, taskStatus }))
    .then((result) => ({ _id: result.insertedId, task, creationDate, taskStatus }))
};

const getAll = async () => Connection()
  .then((db) => db.collection('tasks').find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const task = await Connection()
    .then((db) => db.collection('tasks').findOne({ _id: new ObjectId(id) }));

  if (!task) return null;

  return task;
};

const updateTask = async (id, task, creationDate, taskStatus) => {
  const lastUpdate = new Date();
  return Connection()
  .then((db) => db.collection('tasks').updateOne(
    { _id: new ObjectId(id) },
    { $set: { task, taskStatus, lastUpdate } },
  ))
  .then((_result) => ({ _id: id, task, creationDate, taskStatus, lastUpdate }));
}

const deleteTask = async (id) => Connection()
.then((db) => db.collection('tasks').deleteOne({ _id: new ObjectId(id) }));


module.exports = {
  createTask,
  getAll,
  getById,
  updateTask,
  deleteTask,
}