'use strict';

const express = require('express'),
      photosController = require('../controllers/photos_controller'),
      passportService = require('../services/passport'),
      photosRouter = express.Router();

photosRouter.route('/delete')
    .put(passportService.requireAuth, photosController.photoDelete);
    
photosRouter.route('/tagsupdate')
    .put(passportService.requireAuth, photosController.tagsUpdate);    
    
module.exports = photosRouter;