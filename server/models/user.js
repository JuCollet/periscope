'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      bcrypt = require('bcrypt');

      
const userSchema = new Schema({
    firstname : String,
    lastname : String,
    email : {
        type: String,
        unique: true
    },
    password : String,
    plan : String
});

userSchema.pre('save', function(next){
  const user = this;
  bcrypt.hash(user.password, 10, function(err, hash){
    if(err)throw err;
    user.password = hash;
    next();
  });
});

module.exports = mongoose.model('User', userSchema);