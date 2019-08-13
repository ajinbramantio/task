var express = require('express')
var router = express.Router()
const { Register, Login } = require('../controllers/users')

/* GET home page. */
router.post('/register', Register)
router.post('/login', Login)

module.exports = router
