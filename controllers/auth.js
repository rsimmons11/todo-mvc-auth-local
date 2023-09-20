// Imports the 'passport' module, which is commonly used for authentication in Node.js applications.
const passport = require('passport')
// Imports the 'validator' module, which provides various validation functions for checking data such as strings, emails, and URLs.
const validator = require('validator')
// Imports the 'User' model from a file located in the '../models' directory relative to the current file.
const User = require('../models/User')

// Exports a function named 'getLogin' as a part of the module. This function is typically used as a controller for handling HTTP GET requests. It checks if a user is already authenticated (req.user) and either redirects them to the '/todos' page if authenticated or renders a 'login' view if not.
 exports.getLogin = (req, res) => {
    if (req.user) {
      return res.redirect('/todos')
    }
    res.render('login', {
      title: 'Login'
    })
  }
  
  // Exports a function named 'postLogin' as a part of the module. This function typically handles HTTP POST requests for user login. It takes the request (req), response (res), and a callback function (next) as parameters.
  exports.postLogin = (req, res, next) => {
    // Initializes an empty array called 'validationErrors' to store validation error messages.
    const validationErrors = []
    // Code checks if the email provided in the request body is a valid email address using the 'validator' module's 'isEmail' function. If it's not valid, an error message is added to the 'validationErrors' array.
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    // Code checks if the password provided in the request body is empty. If it is, an error message is added to the 'validationErrors' array.
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
  
    // Conditional block checks if there are any validation errors. If there are, it adds them to the flash messages using 'req.flash' and redirects the user back to the '/login' page.
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/login')
    }
    // This line normalizes the email address by removing dots (if specified by the options) and updates the 'email' field in the request body with the normalized email.
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    // This line uses Passport's 'authenticate' middleware with the 'local' strategy to handle user authentication. It takes a callback function that receives 'err', 'user', and 'info' parameters.
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        req.flash('errors', info)
        return res.redirect('/login')
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' })
        res.redirect(req.session.returnTo || '/todos')
      })
    })(req, res, next)
  }
  
  // exports a function named 'logout' as a part of the module. This function handles user logout and takes the request (req) and response (res) objects as parameters.
  exports.logout = (req, res) => {
    // This line logs out the user by calling the logout method on the request object (usually provided by Passport or a similar authentication library). It takes a callback function that is executed once the logout operation is complete. In this case, it logs a message indicating that the user has logged out.
    req.logout(() => {
      console.log('User has logged out.')
    })
    // This line destroys the user's session, effectively logging them out. It takes a callback function with an error parameter. If an error occurs during session destruction, it logs an error message. After destroying the session, it sets req.user to null (indicating that there is no authenticated user) and redirects the user to the root page ('/').
    req.session.destroy((err) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
      res.redirect('/')
    })
  }
  
  // exports a function named 'getSignup' as a part of the module. This function is typically used to handle HTTP GET requests for rendering a sign-up page. It takes the request (req) and response (res) objects as parameters.
  exports.getSignup = (req, res) => {
    // conditional block checks if there is a user already authenticated (req.user). If a user is already authenticated, it redirects them to the '/todos' page, assuming they shouldn't access the sign-up page while logged in.
    if (req.user) {
      return res.redirect('/todos')
    }
    // If there is no authenticated user, this line renders the 'signup' view (presumably an HTML template) and passes in some data, including the title 'Create Account'. This typically results in the sign-up page being displayed to the user when they access this route.
    res.render('signup', {
      title: 'Create Account'
    })
  }
  
  // exports a function named 'postSignup' as a part of the module. This function typically handles HTTP POST requests for user sign-up. It takes the request (req), response (res), and a callback function (next) as parameters.
  exports.postSignup = (req, res, next) => {
    const validationErrors = []
    // It checks if the provided email is a valid email address using validator.isEmail.
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
  
    // It checks if the provided password is at least 8 characters long using validator.isLength.
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('../signup')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    })
  
    // checks if a user with the same email address or username already exists in the database using User.findOne.
    User.findOne({$or: [
      {email: req.body.email},
      {userName: req.body.userName}
    ]}, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email address or username already exists.' })
        return res.redirect('../signup')
      }
      // If there is no existing user with the same email or username, it saves the new user to the database using user.save.
      user.save((err) => {
        if (err) { return next(err) }
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          res.redirect('/todos')
        })
      })
    })
  }