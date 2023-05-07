const Todos = require('../models/todosModel')
const mongoose = require('mongoose')

const getTodos = async (req, res) => {
  try {
    const user_id = req.user._id

    const todos = await Todos.find({ user_id }).sort({ createdAt: -1 })
    
    return res.status(200).json(todos)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const getTodo = async (req, res) => {
  const { id } = req.params

  try {
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({ error: 'The provided workout ID is not valid. Please check your input and try again' })
    } else {
      const todos = await Todos.findById(id)

      return res.status(200).json(todos)
    }
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const createTodo = async (req, res) => {
  const user_id = req.user._id

  const { title, content } = req.body

  try {
    const todos = await Todos.create({ title, content, user_id })

    return res.status(200).json(todos)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const updateTodo = async (req, res) => {
  const { id } = req.params

  try {
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({ error: 'The provided workout ID is not valid. Please check your input and try again' })
    } else {
      const todos = await Todos.findOneAndUpdate({ _id: id }, { ...req.body })

      return res.status(200).json(todos)
    }
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const deleteTodo = async (req, res) => {
  const { id } = req.params

  try {
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({ error: 'The provided workout ID is not valid. Please check your input and try again' })
    } else {
      const todos = await Todos.findOneAndDelete({ _id: id })

      return res.status(200).json(todos)
    }
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
}