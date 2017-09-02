'use strict';

const express = require('express'),
      albumsController = require('../controllers/albums_controller'),
      albumRouter = express.Router(),
      passportService = require('../services/passport');

albumRouter.route('/')
    .get(passportService.requireAuth, albumsController.getAlbums)
    .post(passportService.requireAuth, albumsController.createAlbum)
    .delete(passportService.requireAuth, albumsController.deleteAlbum);

albumRouter.route('/searchalbum/')
    .post(passportService.requireAuth, albumsController.searchAlbum);
    
albumRouter.route('/searchphotos/')
    .post(passportService.requireAuth, albumsController.searchPhotos);
    
albumRouter.route('/:id')
    .get(albumsController.getAlbum);
    
albumRouter.route('/updateAlbumThumb/')
    .put(albumsController.updateAlbumThumb);

module.exports = albumRouter;