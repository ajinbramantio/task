var express = require('express')
var router = express.Router()
const { Register, Login, Read, Logout } = require('../controllers/users')

/* GET home page. */
router.post('/register', Register)
router.post('/login', Login)
router.get('/user/:userId', Read)
router.get('/logout', Logout)

module.exports = router
