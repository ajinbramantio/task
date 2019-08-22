const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.userById = (req, res, next, id) => {
  // let id = req.params.userId
  User.findById(id).exec((err, user) => {
    // cari data berdasarkan id
    if (err || !user) {
      // jika error or user not found, send in here
      return res.status(404).json({
        error: 'user Not found'
      })
    }

    req.profile = user // user sent to req.profile
    next() // function params callback
  })
}

exports.RegisterAdmin = async (req, res) => {
  const gentSalt = await bcrypt.genSalt(6)
  const hashedPassword = await bcrypt.hash(process.env.PW, gentSalt)
  const newAdmin = {
    userName: process.env.UN,
    email: process.env.E,
    salt: gentSalt,
    password: hashedPassword,
    role: process.env.R
  }
  const admin = await new User(newAdmin).save()

  //   console.log(admin)
  const { salt, password, ...dataAdmin } = admin._doc

  return res.status(201).send({
    message: 'Successfully created admin',
    data: dataAdmin
  })
}
exports.Register = async (req, res) => {
  const gentSalt = await bcrypt.genSalt(6)
  const hashedPassword = await bcrypt.hash(req.body.password, gentSalt)
  const newUser = {
    ...req.body,
    salt: gentSalt,
    password: hashedPassword
  }
  const foundUser = await User.findOne({ userName: req.body.userName })
  if (foundUser) {
    return res.send({
      message: 'user is ready exists'
    })
  }

  try {
    const user = await new User(newUser).save()

    // console.log(user)
    const { salt, password, ...dataUser } = user._doc

    res.status(200).send({
      message: 'create user success',
      dataUser
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
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.SECRET
    ) // create token

    res.cookie('token', token, { expire: new Date() + 9999 }) //set cookie

    const { password, salt, ...data } = user._doc
    console.log(token)

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
  console.log(token)

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
    res.status(404).send({
      message: 'salah'
    })
  }
}

exports.Logout = (req, res) => {
  res.clearCookie('token') // clear token in cookie
  res.send({
    message: 'sign out success'
  })
}
