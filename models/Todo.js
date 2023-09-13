const mongoose = require('mongoose')

// Defines a Mongoose schema named TodoSchema for a todo item. The schema specifies the structure of a document in a MongoDB collection
const TodoSchema = new mongoose.Schema({

  // A string field representing the todo item's description. It is marked as required (required: true), indicating that every todo item document must have this field.
  todo: {
    type: String,
    required: true,
  },

  // A boolean field indicating whether the todo item is completed or not. It is also marked as required.
  completed: {
    type: Boolean,
    required: true,
  },

  // A string field representing the user ID associated with the todo item. This field is marked as required as well.
  userId: {
    type: String,
    required: true
  }
})

// Exports a Mongoose model named 'Todo' using the mongoose.model method. This model is based on the TodoSchema, allowing you to interact with the MongoDB collection associated with todo items using Mongoose's functions and methods.
module.exports = mongoose.model('Todo', TodoSchema)
