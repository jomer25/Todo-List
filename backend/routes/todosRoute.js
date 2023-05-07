const express = require('express')
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todosController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.route('/')
.get(getTodos)
.post(createTodo)

router.route('/:id')
.get(getTodo)
.put(updateTodo)
.delete(deleteTodo)

module.exports = router