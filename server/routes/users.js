'use strict';

const express = require('express'),
      mongoose = require('mongoose'),
      User = require('../models/user'),
      Authentication = require('../controllers/authentication'),
      passportService = require('../services/passport'),
      passport = require('passport'),
      userRouter = express.Router();

userRouter.route('/signup')
    .post(Authentication.signup);
    
userRouter.route('/signin')
    .post(passportService.requireSignin, Authentication.signin);
    
userRouter.route('/')
    .get(passportService.requireAuth, function(req, res, next){
        res.send({hello:"coucou"});
    });
    
module.exports = userRouter;