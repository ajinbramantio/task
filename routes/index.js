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
router.param('userId', userById)

module.exports = router
