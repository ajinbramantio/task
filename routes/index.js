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
  Update_task,
  Delete_task
} = require('../controllers/task')

/* GET home page. */
router.get('/meAdmin', RegisterAdmin)
router.post('/register', Register)
router.post('/login', Login)
router.get('/secret/:userId', requireSignIn, isAuth, isAdmin, (req, res) => {
  res.send({
    user: req.profile
  })
})
router.get('/user/:userId', requireSignIn, isAuth, Read)
router.get('/logout', Logout)

router.post('/create-task/:userId', requireSignIn, isAuth, CreateTask)
router.get('/get-task/:userId', requireSignIn, isAuth, Get_Task)
router.put('/update-task/:taskId/:userId', requireSignIn, isAuth, Update_task)
router.delete(
  '/remove-task/:taskId/:userId',
  requireSignIn,
  isAuth,
  Delete_task
)

router.param('userId', userById)

module.exports = router
