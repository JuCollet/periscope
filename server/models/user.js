'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      bcrypt = require('bcrypt');

      
const userSchema = new Schema({
    firstname : String,
    email : {
        type: String,
        unique: true
    },
    password : String,
    volume : {
      type: Number,
      default: 5
    },
    bucket: String
});

userSchema.pre('save', function(next){
  const user = this;
  bcrypt.hash(user.password, 10, function(err, hash){
    if(err)throw err;
    user.bucket = Date.now();
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(passwordToCompare, callback){
  bcrypt.compare(passwordToCompare, this.password, function(err, isMatch){
      if(err) return callback(err);
      callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);