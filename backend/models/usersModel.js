const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true, 
    unique: true
  },
  password: {
    type: String,
    require: true,
  }
})

userSchema.statics.signup = async function (email, password) {
  if(!email || !password){
    throw new Error('Please enter your email and password to proceed')
  }

  if(!validator.isEmail(email)){
    throw new Error('Please enter a valid email address')
  }

  if(!validator.isStrongPassword(password)){
    throw new Error('please enter a password that is at least 8 characters long and includes at least one uppercase letter, one special character, and one number')
  }

  const existingUsers = await this.findOne({ email })

  if(existingUsers){
    throw new Error('The email you entered is already in use. Please use a different email address')
  }

  const hashPassword = await bcrypt.hash(password, 10)

  const user = await this.create({ email, password: hashPassword })

  return user
}

userSchema.statics.login = async function (email, password) {
  if(!email || !password){
    throw new Error('Please enter your email and password to proceed')
  }

  const user = await this.findOne({ email })

  if(!user){
    throw new Error('The email or password you entered is incorrect. Please try again')
  }

  const matchPassword = await bcrypt.compare(password, user.password)
  
  if(!matchPassword){
    throw new Error('The password you entered is incorrect. Please double-check your password and try again')
  }

  return user
}

module.exports = mongoose.model('Users', userSchema)