const jwt = require('jsonwebtoken')
const Users = require('../controllers/usersController')

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers

  if(!authorization) {
    return res.status(401).json({ error: 'Authorization token is required' })
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)

    req.user = await Users.findOne({ _id }).select('_id')

    next()
  } catch (error) {
    console.error(error.message)
    return res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth