exports.CreateTask = async (req, res) => {
  res.send({
    message: 'create Task'
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
