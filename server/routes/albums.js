'use strict';

const express = require('express'),
      mongoose = require('mongoose'),
      Album = require('../models/album'),
      albumRouter = express.Router();

albumRouter.route('/')
    .get(function(req,res,next){
        Album.find({}, function(err, albums){
            if(err) return next(err);
            res.json(albums);
        });
    })
    .post(function(req,res,next){
        const newAlbum = req.body;
        Album.create(newAlbum, function(err, album){
            if(err) return next(err);
            res.json(album);
        });
    });
    
albumRouter.route('/:id')
    .get(function(req,res,next){
        Album.findById(req.params.id, function(err,album){
            if(err) return next(err);
            res.json(album);
        });
    });

module.exports = albumRouter;