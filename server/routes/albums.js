'use strict';

const express = require('express'),
      albumsController = require('../controllers/albums_controller'),
      albumRouter = express.Router(),
      passportService = require('../services/passport'),
      authorizations = require('../services/authorizations');

albumRouter.route('/searchalbum/')
    .post(passportService.requireAuth, albumsController.searchAlbum);
    
albumRouter.route('/searchphotos/')
    .post(passportService.requireAuth, albumsController.searchPhotos);
    
albumRouter.route('/getalbum/:id')
    .get(albumsController.getAlbum);
    
albumRouter.route('/download/:id')
    .get(passportService.requireAuth, albumsController.downloadAlbum);
    
albumRouter.route('/updateAlbumThumb/')
    .put(passportService.requireAuth, authorizations.canWrite, albumsController.updateAlbumThumb);
    
albumRouter.route('/')
    .get(passportService.requireAuth, albumsController.getAlbums)
    .post(passportService.requireAuth, authorizations.canWrite, albumsController.createAlbum)
    .delete(passportService.requireAuth, authorizations.canDelete, albumsController.deleteAlbum);    

module.exports = albumRouter;