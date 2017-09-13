'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      bcrypt = require('bcrypt'),
      randomToken = require('random-token');

      
const userSchema = new Schema({
    firstname : String,
    email : {
        type: String,
        unique: true
    },
    password : String,
    volume : {
      type: Number,
      default: 1073741824
    },
    usedVolume : {
      type : Number,
      default : 0
    },
    bucket: String,
    admin : {
      type : Boolean,
      default : false
    },
    canWrite : {
      type : Boolean,
      default : true
    },
    canDelete : {
      type : Boolean,
      default : true
    }
});

userSchema.pre('save', function(next){
  const user = this;
  bcrypt.hash(user.password, 10, function(err, hash){
    if(err)throw err;
    if(!user.bucket || user.bucket.length < 20) {
      user.bucket = randomToken(8) + Date.now();
      user.admin = true;
    }
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