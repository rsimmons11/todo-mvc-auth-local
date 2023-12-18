// Import required libraries/modules
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Define the UserSchema using Mongoose's Schema class
const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true }, // User's username (unique)
  email: { type: String, unique: true }, // User's email (unique)
  password: String, // User's password (hashed)
});

// Password hash middleware.
// This middleware is triggered before saving a user to the database.
UserSchema.pre('save', function save(next) {
  const user = this;

  // Check if the password is modified before hashing
  if (!user.isModified('password')) {
    return next();
  }

  // Generate a salt and hash the password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      // Update the user's password with the hashed version
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.
// This method is used to compare a provided password with the hashed password stored in the database.
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

// Export the Mongoose model named 'User' with the defined UserSchema
module.exports = mongoose.model('User', UserSchema);
