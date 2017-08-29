'use strict';

const express = require('express'),
      mongoose = require('mongoose'),
      Album = require('../models/album'),
      albumController = require('../controllers/albums'),
      albumRouter = express.Router(),
      passportService = require('../services/passport'),
      aws = require('aws-sdk'),
      s3 = new aws.S3({
        endpoint: 's3-eu-central-1.amazonaws.com',
        signatureVersion: 'v4',
        region: 'eu-central-1'
      });
      aws.config.update({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      });         

albumRouter.route('/')
    .get(passportService.requireAuth, albumController.getAlbums)
    .post(function(req,res,next){
        const newAlbum = req.body;
        Album.create(newAlbum, function(err, album){
            if(err) return next(err);
            res.json(album);
        });
    })
    .delete(function(req,res,next){
        Album.findByIdAndRemove(req.body.albumId, function(err, album){
            if(err) return next(err);
            
            let files = [];
            
            const filesMap = album.photos.map(photo => {
                return [
                    { 
                        Key : `thumb${photo.filename}` 
                        
                    },
                    { 
                        Key : `medium${photo.filename}` 
                        
                    },
                    { 
                        Key : `original${photo.filename}` 
                        
                    }
                ];
            });
            
            for(var i = 0; i < filesMap.length; i++){
                files = files.concat(filesMap[i]);
            }

        if(files.length > 0){

            const params = {
                Bucket: "periscopefiles",
                Delete : {
                    Objects : files
                }
            };
    
            s3.deleteObjects(params, function(err, data){
                if(err) return next(err);
            });   

        }
        
        res.json(album);

        });
    });

albumRouter.route('/searchalbum/')
    .post(albumController.searchAlbum);
    
albumRouter.route('/searchphotos/')
    .post(albumController.searchPhotos);
    
albumRouter.route('/:id')
    .get(albumController.getAlbum);
    
albumRouter.route('/updateAlbumThumb/')
    .put(function(req,res,next){
        Album.findByIdAndUpdate(req.body.id, {'$set':  {'albumThumb': req.body.albumThumb}}, { new : true }, function(err, album){
            if(err) return next(err);
            res.json(album);
        });
    });

module.exports = albumRouter;