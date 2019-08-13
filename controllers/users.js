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
