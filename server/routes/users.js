'use strict';

const express = require('express'),
      usersController = require('../controllers/users_controller'),
      passportService = require('../services/passport'),
      authorizations = require('../services/authorizations'),
      userRouter = express.Router();

userRouter.route('/signup')
    .post(usersController.signup);
    
userRouter.route('/signin')
    .post(passportService.requireSignin, usersController.signin);

userRouter.route('/infos')
    .get(passportService.requireAuth, usersController.getInfos);

userRouter.route('/invite')
    .post(passportService.requireAuth, authorizations.isAdmin, usersController.inviteFriend);

module.exports = userRouter;