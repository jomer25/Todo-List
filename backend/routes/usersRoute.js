const express = require('express')
const { userSignup, userLogin } = require('../controllers/usersController')

const router = express.Router()

router
.post('/signup', userSignup)
.post('/login', userLogin)

module.exports = router