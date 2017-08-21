'use strict';

const express = require('express'),
      mongoose = require('mongoose'),
      User = require('../models/user'),
      Authentication = require('../controllers/authentication'),
      passportService = require('../services/passport'),
      passport = require('passport'),
      userRouter = express.Router();
      
const requireAuth = passport.authenticate('jwt', {session : false});
const requireSignin = passport.authenticate('local', {session : false});

userRouter.route('/signup')
    .post(Authentication.signup);
    
userRouter.route('/signin')
    .post(requireSignin, Authentication.signin);
    
userRouter.route('/')
    .get(requireAuth, function(req, res, next){
        res.send({hello:"coucou"});
    });
    
module.exports = userRouter;