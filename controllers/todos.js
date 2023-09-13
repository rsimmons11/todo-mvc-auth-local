const Todo = require('../models/Todo')

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
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id})
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
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