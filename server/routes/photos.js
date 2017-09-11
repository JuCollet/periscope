'use strict';

const express = require('express'),
      photosController = require('../controllers/photos_controller'),
      passportService = require('../services/passport'),
      photosRouter = express.Router();

photosRouter.route('/delete')
    .put(passportService.requireAuth, photosController.photoDelete);
    
photosRouter.route('/update')
    .put(passportService.requireAuth, photosController.photoUpdate);
    
photosRouter.route('/share')
    .post(passportService.requireAuth, photosController.photoShare);

module.exports = photosRouter;