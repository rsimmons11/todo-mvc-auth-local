// Import the Express library
const express = require('express');

// Create an instance of the Express router
const router = express.Router();

// Import the todosController and ensureAuth middleware
const todosController = require('../controllers/todos');
const { ensureAuth } = require('../middleware/auth');

// Route handler for a GET request to the root URL ("/")
// It ensures user authentication before calling the getTodos function from the todosController module
router.get('/', ensureAuth, todosController.getTodos);

// Route handler for a POST request to create a new todo
router.post('/createTodo', todosController.createTodo);

// Route handler for a PUT request to mark a todo as complete
router.put('/markComplete', todosController.markComplete);

// Route handler for a PUT request to mark a todo as incomplete
router.put('/markIncomplete', todosController.markIncomplete);

// Route handler for a DELETE request to delete a todo
router.delete('/deleteTodo', todosController.deleteTodo);

// Export the router to be used in other parts of the application
module.exports = router;
