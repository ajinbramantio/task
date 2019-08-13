var express = require('express')
var router = express.Router()
const { Register } = require('../controllers/users')

/* GET home page. */
router.post('/register', Register)

module.exports = router
