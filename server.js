// Import the Express.js framework to create a web server
const express = require('express')

// Create an instance of the Express application, which represents your web server.
const app = express()

// Imports the Mongoose library for MongoDB. It allows us to interact with MongoDB databases using JavaScript. 
const mongoose = require('mongoose')

// Imports the Passport.js library, which is a middleware for user authentication in Express.js applications.  Passport provides various authentication strategies for authentication users, such as local username ans passwords, OAuth, and more
const passport = require('passport')

// Imports the 'express-session' middleware, which is used to manage user sessions in Express.js applications.  Sessions are typically used for user authentication and maintaining user state across requests.
const session = require('express-session')

// Configures a session store for 'express-session' that uses MongoDB to store session data. The 'MongoStore' is provided by the 'connect-mongo' library, and it allows you to store session information in a MongoDB database, which is a common practice in Express.js applications.
const MongoStore = require('connect-mongo')(session)

// Imports the 'express-flash' middleware, which is used to display flash messages to users. Flash messages are typically used to show temporary messages to users, such as success messages after a form submission. 
const flash = require('express-flash')

// Imports the 'morgan' middleware, which is used for logging HTTP requests and responses.  It provides information about incoming request, including details like the HTTP method, URL, and response status code. It's useful for debugging and monitoring your application,.
const logger = require('morgan')

// Import a function (method) called connectDB from a module located in the './config/database' file. This function is typically responsible for connecting to a database.
const connectDB = require('./config/database')

// Imports an Express.js router module from a file names 'main.js' located in the './routes' directory. This router module likely contains route handlers and logic related to the main functionality or homepage of your application.
const mainRoutes = require('./routes/main')

// Imports an Express.js router module from a file names 'todos.js' located in the './routes' directory. This router module likely contains route handlers and logic related to the main functionality or homepage of your application.
const todoRoutes = require('./routes/todos')

// Load environment variables from a '.env' file located in the './config/' directory using the dotenv package.  This is commonly used to store configuration settings for the application. 
require('dotenv').config({path: './config/.env'})

// Passport config
// importing a module located at './config/passport' and immediately invoking it with the 'passport' object as an argument, likely configuring Passport.js for authentication in a Node.js application.
require('./config/passport')(passport)

// Calls the function to establish a connection to a database.  The specific database and connection details are typically defined in the './config/database' module. 
connectDB()

// Set the view engine to 'ejs' (Embedded JavaScript), indicating that this application will use EJS templates to render dynamic content on web pages
app.set('view engine', 'ejs')

// Serve static files (e.g., CSS, JavaScript, images) from the 'public' directory. This allows clients to access these files directly via URLs.
app.use(express.static('public'))

// Configure Express to parse incoming request. The first line parsed URL-encoded data (commonly used in form submissions), and the second line parsed JSON data from requests. 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Configuring the 'logger' middleware with the 'dev' format and adding it to the Express.js 'app' object, enabling logging of HTTP request/response information during development.
app.use(logger('dev'))

// Sessions
// Registering middleware in an Express.js application using the app.use() method. Middleware functions are executed in the order they are added to the application and can process incoming HTTP requests and responses.
app.use(
  // A session middleware is initialized by calling the session() function with an object containing configuration options.
    session({
      // setting a session secret, which is used to sign session cookies for security. The 'keyboard cat' value is a placeholder for an actual secret.
      secret: 'keyboard cat',
      // configures whether the session should be saved back to the session store on every request. Setting it to false typically improves performance by avoiding unnecessary writes to the store.
      resave: false,
      // determines whether a session should be saved in the store if it's new and hasn't been modified. Setting it to false is often a good practice to avoid storing empty or unused sessions.
      saveUninitialized: false,
      // This line specifies the session store where session data will be persisted. In this case, it's using MongoStore, which is designed to store session data in a MongoDB database. It is configured with the mongooseConnection option, which tells it to use the existing Mongoose connection (mongoose.connection) for database interactions.
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware

// Initializes Passport and prepares it for authentication. It's a required step to use Passport for authentication in your application.
app.use(passport.initialize())

// Sets up Passport to work with sessions. It enables Passport to serialize and deserialize user instances to and from the session store. This is crucial for maintaining user authentication state across different requests.
app.use(passport.session())

// This line adds the "flash" middleware to your Express.js application.
app.use(flash())



  
// These lines are essential for routing requests to the appropriate parts of your application, allowing you to organize and modularize your code based on different URL paths. The mainRoutes and todoRoutes likely contain the actual route handlers and logic for handling requests related to the main application and todo management, respectively.

// This line tells Express to use the mainRoutes middleware for any requests that match the root URL ("/"). In other words, when a user accesses the root URL of your application, the mainRoutes middleware will be invoked to handle the request.
app.use('/', mainRoutes)

// This line configures the todoRoutes middleware for requests that have the '/todos' path prefix. So, when a user accesses URLs starting with '/todos', the todoRoutes middleware will handle those requests.
app.use('/todos', todoRoutes)



// Start the Express server and make it listen on a port specified in the 'process.env.PORT' environment variable. when the server starts, it runs the provided callback function, which logs a message to the console indicating that the server is running. 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    