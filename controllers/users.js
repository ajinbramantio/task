const User = require('../models/UserModel')
const bcrypt = require('bcrypt')

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
