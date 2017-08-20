'use strict';

const express = require('express'),
      mongoose = require('mongoose'),
      User = require('../models/user'),
      Authentication = require('../controllers/authentication'),
      userRouter = express.Router();
      
userRouter.route('/signup')
    .post(Authentication.signup);
    
module.exports = userRouter;