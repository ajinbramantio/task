const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.requireSignIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: 'auth'
})

exports.isAuth = async (req, res, next) => {
  const user = req.profile._id == req.auth._id
  //   console.log(req.profile._id, req.auth._id)

  if (!user) {
    return res.status(403).json({
      error: 'Access denied'
    })
  }

  next()
}
exports.isAdmin = async (req, res, next) => {
  if (req.profile.role !== 1) {
    return res.status(403).json({
      error: 'Admin resourse! Access denied'
    })
  }
  next()
}
