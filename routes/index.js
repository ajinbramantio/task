var express = require('express')
var router = express.Router()
const { Register, Login, Read } = require('../controllers/users')

/* GET home page. */
router.post('/register', Register)
router.post('/login', Login)
router.get('/user/:userId', Read)

module.exports = router
