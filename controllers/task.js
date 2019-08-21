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
  const userId = req.auth._id
  const foundTask = await Task.find({ creator: userId })
  const foundTaskAll = await Task.find().populate('creator', 'name role')
  // console.log(rfoundTaskAll)

  if (req.auth.role == process.env.R) {
    return res.send({
      message: 'get success',
      data: foundTaskAll
    })
  }

  return res.send({
    message: 'get success',
    data: foundTask
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
