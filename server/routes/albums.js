'use strict';

const express = require('express'),
      mongoose = require('mongoose'),
      Album = require('../models/album'),
      albumRouter = express.Router(),
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
    .get(function(req,res,next){
        Album.aggregate([
            {
                $project : {
                    name: 1,
                    description : 1,
                    updatedAt : 1,
                    thumb : { $arrayElemAt : ["$photos.thumb", 0] },
                    numberOfPhotos : { $size: "$photos"}
                }
            }
        ], function(err, albums){
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
    .post(function(req,res,next){
        
        Album.aggregate([
            {
                $match : { tags : {$regex : req.body.tags, $options: 'i'}},
            },
            {
                $project : {
                    name: 1,
                    description : 1,
                    updatedAt : 1,
                    thumb : { $arrayElemAt : ["$photos.thumb", 0] },
                    numberOfPhotos : { $size: "$photos"}
                }
            }
        ],function(err, albums){
            if(err) return next(err);
            res.json(albums);
        });
    });
    
albumRouter.route('/searchphotos/')
    .post(function(req,res,next){
        Album.find({"photos.tags" : {$regex : req.body.tags, $options: 'i'}}, function(err, albums){
            if(err) return next(err);
            res.json(albums);
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