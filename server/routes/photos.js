'use strict';

const express = require('express'),
      photosController = require('../controllers/photos_controller'),
      passportService = require('../services/passport'),
      authorizations = require('../services/authorizations'),
      photosRouter = express.Router();

photosRouter.route('/delete')
    .put(passportService.requireAuth, authorizations.canDeletePhoto, photosController.photoDelete);
    
photosRouter.route('/update')
    .put(passportService.requireAuth, authorizations.canWrite, photosController.photoUpdate);
    
photosRouter.route('/share')
    .post(passportService.requireAuth, photosController.photoShare);

module.exports = photosRouter;