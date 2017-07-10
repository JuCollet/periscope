'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var promise = mongoose.connect(`mongodb://${process.env.mongo_user}:${process.env.mongo_pass}${process.env.mongo_url}`, {
  useMongoClient: true,
});

promise.then(function(){
    console.log('Successfully connected to MongoDB');
}).catch(function(){
    console.log('Unable to connect to MongoDB');
});