var express = require('express')
var router = express.Router()
const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth')
const {
  RegisterAdmin,
  Register,
  Login,
  Read,
  Logout,
  userById
} = require('../controllers/users')

const {
  CreateTask,
  Get_Task,
  Update_Task,
  Delete_Task,
  Edit_Task
} = require('../controllers/task')

/* GET home page. */
router.get('/', (req, res) => {
  res.send({
    message: 'welcome'
  })
})
router.get('/meAdmin', RegisterAdmin)
router.post('/register', Register)
router.post('/login', Login)
router.get('/secret/:userId', requireSignIn, isAdmin, (req, res) => {
  res.send({
    user: req.profile
  })
})
router.get('/user/:userId', requireSignIn, Read)
router.get('/logout', Logout)

router.post('/create-task/:userId', requireSignIn, CreateTask)
router.get('/get-task/:userId', requireSignIn, Get_Task)
router.get('/edit-task/:taskId/:userId', requireSignIn, Edit_Task)
router.put('/update-task/:taskId/:userId', requireSignIn, Update_Task)
router.delete('/remove-task/:taskId/:userId', requireSignIn, Delete_Task)

router.param('userId', userById)

module.exports = router
