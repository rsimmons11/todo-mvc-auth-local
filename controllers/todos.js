// Import the 'Todo' model from a file located in the '../models/' directory.
const Todo = require('../models/Todo')

// Export an object containing several methods that handle various actions related to managing todo items.
module.exports = {
    getTodos: async (req,res)=>{

        // Logs the user information from the request object (req.user) to the console.
        console.log(req.user)

        // The try-catch block, attempts to find todo items associated with the authenticated user's ID using the Todo model, and stores the result in the 'todoItems' variable. It also counts the number of uncompleted todo items for the same user and stores it in the 'itemsLeft' variable.
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})

            // Renders an EJS template named 'todos.ejs' with data containing the retrieved todo items, the count of uncompleted items, and user information.
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})

        // If any errors occur during this process, they are logged to the console.
        }catch(err){
            console.log(err)
        }
    },

    // Creates a new todo item based on the request body and redirects to the '/todos' page.  
    createTodo: async (req, res)=>{
        // This line marks the beginning of a try block, indicating that it's going to try executing the code within this block and handle any errors that may occur.
        try{
            // This line asynchronously creates a new todo item in a database using data from the request body and sets its 'completed' field to 'false'.
            await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id})
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },

    // Marks a todo item as complete based on its ID and sends a JSON response.
    markComplete: async (req, res)=>{
        // This line marks the beginning of a try block, indicating that it's going to try executing the code within this block and handle any errors that may occur.
        try{
            // This line uses the await keyword to update a todo item in a database. It finds a todo item based on its unique ID (_id) received from the request (req.body.todoIdFromJSFile) and sets its completed field to true.
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },

    // Marks a todo item as incomplete based on its ID and sends a JSON response.
    markIncomplete: async (req, res)=>{
        try{
            // Within the try block, this line asynchronously finds a todo item in the database based on its unique ID (provided in the request body), and updates its 'completed' field to 'false'.
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            // After marking the todo item as incomplete, this line logs 'Marked Incomplete' to the console to indicate the successful operation.
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },

    // Deletes a todo item based on its ID and sends a JSON response.
    deleteTodo: async (req, res)=>{
        // This line logs the ID of the todo item received from the request to the console.
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    