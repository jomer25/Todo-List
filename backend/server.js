const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const todosRoute = require('./routes/todosRoute')
const usersRoute = require('./routes/usersRoute')

const app = express()

//middle ware
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//router
app.use('/api/todos', todosRoute)
app.use('/api/users', usersRoute)

//mongodb
mongoose.connect(process.env.MONGO_DB_URI)
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`)
  })
})
.catch((error) => {
  console.log(error.message)
})