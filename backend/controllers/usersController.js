const Users = require('../models/usersModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

const userSignup = async (req, res) => {
  const { email, password } = req.body

  try {
    const users = await Users.signup(email, password)

    const token = createToken(users._id)

    return res.status(201).json({ email, token })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const userLogin = async (req, res) => {
  const { email, password } = req.body

  try {
    const users = await Users.login(email, password)

    const token = createToken(users._id)

    return res.status(201).json({ email, token })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

module.exports = { userSignup, userLogin }