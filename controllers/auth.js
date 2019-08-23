const expressJwt = require('express-jwt')

exports.requireSignIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: 'auth'
})

exports.isAuth = async (req, res, next) => {
  const user = String(req.profile._id) === req.auth._id
  // console.log(String(req.profile._id) === req.auth._id)

  // if (!user) {
  //   res.status(403).json({
  //     error: 'Access denied'
  //   })
  // }

  // console.log('ayasas')
  next()
}
exports.isAdmin = async (req, res, next) => {
  if (req.profile.role != process.env.R) {
    return res.status(403).json({
      error: 'Admin resourse! Access denied'
    })
  }
  next()
}
