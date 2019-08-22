const Task = require('../models/TaskModel')

exports.CreateTask = async (req, res) => {
  // console.log('test')

  const userId = req.auth._id
  const newTask = {
    ...req.body,
    creator: userId
  }
  // console.log(newTask)

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
  const userId = req.auth._id
  const taskId = req.params.taskId

  const foundTask = await Task.findById({ _id: taskId })
  console.log(foundTask)

  // console.log(typeof foundTask._id, typeof taskId)
  if (foundTask === null) {
    return res.send({
      message: 'update fail, data not there'
    })
  } else if (String(foundTask._id) === taskId) {
    const UpdateData = {
      ...req.body
    }
    const resultUpdate = await Task.findOneAndUpdate(
      { $and: [{ _id: taskId }, { creator: userId }] },
      { $set: UpdateData },
      {
        new: true
      }
    )
    // console.log(resultUpdate)

    res.send({
      message: 'update success',
      data: resultUpdate
    })
  }
}
exports.Delete_task = async (req, res) => {
  const userId = req.auth._id
  const taskId = req.params.taskId

  // console.log(req.params)
  try {
    const foundTask = await Task.findOneAndRemove({
      $and: [{ _id: taskId }, { creator: userId }]
    })
    // console.log(foundTask)

    if (foundTask === null) {
      return res.send({
        message: 'delete fail cause data not there'
      })
    }

    return res.send({
      message: 'delete success'
    })
  } catch (error) {
    return res.status(404).send({
      message: 'delete fail'
    })
  }
}
