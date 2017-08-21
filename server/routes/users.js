'use strict';

const express = require('express'),
      mongoose = require('mongoose'),
      User = require('../models/user'),
      Authentication = require('../controllers/authentication'),
      userRouter = express.Router();
      
userRouter.route('/signup')
    .post(Authentication.signup);
    
userRouter.route('/signin')
    .post(Authentication.signin);
    
module.exports = userRouter;