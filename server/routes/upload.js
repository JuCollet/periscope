'use strict';

const express = require('express'),
      uploadController = require('../controllers/upload_controller'),
      passportService = require('../services/passport'),
      multer  = require('multer'),
      storage = multer.diskStorage({
          destination: function (req, file, cb) {
            cb(null, './');
        },
          filename: function (req, file, cb) {
            cb(null, Date.now()+'.jpg');
        }
      }),
      upload = multer({ storage: storage }),      
      uploadRouter = express.Router();

uploadRouter.route('/:id')
    .put(passportService.requireAuth, upload.array('photos', 50), uploadController.sendFiles);

module.exports = uploadRouter;