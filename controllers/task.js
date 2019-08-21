const Task = require('../models/TaskModel')

exports.CreateTask = async (req, res) => {
  const userId = req.auth._id
  const newTask = {
    ...req.body,
    creator: userId
  }
  const result = await Task.create(newTask)

  res.send({
    message: 'create Task',
    data: result
  })
}

exports.Get_Task = async (req, res) => {
  return res.send({
    message: 'get success'
  })
}

exports.Update_task = async (req, res) => {
  res.send({
    message: 'update success'
  })
}
exports.Delete_task = async (req, res) => {
  res.send({
    message: 'delete success'
  })
}
