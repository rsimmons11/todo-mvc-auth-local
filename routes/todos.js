const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos') 
const { ensureAuth } = require('../middleware/auth')

// This code sets up a route handler for a GET request to the root URL ("/"), using the Express.js router. It ensures that the user is authenticated (likely through middleware) before calling the getTodos function (method) from the todosController module (controller) to handle the request.
router.get('/', ensureAuth, todosController.getTodos)

router.post('/createTodo', todosController.createTodo)

router.put('/markComplete', todosController.markComplete)

router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteTodo', todosController.deleteTodo)

module.exports = router