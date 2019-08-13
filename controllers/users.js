const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.Register = async (req, res) => {
  const gentSalt = await bcrypt.genSalt(6)
  const hashedPassword = await bcrypt.hash(req.body.password, gentSalt)
  const newUser = {
    ...req.body,
    salt: gentSalt,
    password: hashedPassword
  }
  try {
    const user = await new User(newUser).save()

    console.log(user)
    const { salt, password, ...dataUser } = user._doc

    res.status(200).send({
      message: 'user',
      data: dataUser
    })
  } catch (error) {
    res.send({
      message: 'data is ready exists'
    })
  }
}

exports.Login = (req, res) => {
  const email = req.body.email
  User.findOne({ email }, async (err, user) => {
    if (err || !user) {
      return res.send({
        message: 'email not registered'
      })
    }
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!comparePassword) {
      return res.send({
        message: 'password wrong'
      })
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECRET) // create token

    res.cookie('token', token, { expire: new Date() + 9999 }) //set cookie

    const { password, salt, ...data } = user._doc
    console.log(req.cookie)

    res.send({
      message: 'login success',
      token,
      data
    })
  })
}

exports.Read = async (req, res) => {
  const id = req.params.userId
  const token = req.headers.authorization.split(' ')[1]
  //   console.log(req.cookies.token, token, 'AAA')

  if (!req.cookies.token && token) {
    // console.log(req.cookie, token, 'aa')
    res.send({
      message: 'please login'
    })
  }
  try {
    const decoded = await jwt.verify(token, process.env.SECRET)
    if (decoded._id !== id) {
      res.send({
        message: 'invalid id'
      })
    }
    const foundUser = await User.findById(id, {
      salt: 0,
      password: 0
    })

    res.send({
      message: 'read data',
      data: foundUser
    })
  } catch (error) {
    //invalid token
    res.send({
      message: error.message
    })
  }
}

exports.Logout = (req, res) => {
  res.clearCookie('token') // clear token in cookie
  res.send({
    message: 'sign out success'
  })
}
