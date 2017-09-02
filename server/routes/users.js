'use strict';

const express = require('express'),
      usersController = require('../controllers/users_controller'),
      passportService = require('../services/passport'),
      userRouter = express.Router();

userRouter.route('/signup')
    .post(usersController.signup);
    
userRouter.route('/signin')
    .post(passportService.requireSignin, usersController.signin);
    
module.exports = userRouter;