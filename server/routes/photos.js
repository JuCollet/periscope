'use strict';

const express = require('express'),
      mongoose = require('mongoose'),
      Album = require('../models/album'),
      aws = require('aws-sdk'),
      photosRouter = express.Router(),
      s3 = new aws.S3({
        endpoint: 's3-eu-central-1.amazonaws.com',
        signatureVersion: 'v4',
        region: 'eu-central-1'
      });
      aws.config.update({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      });      

photosRouter.route('/')
    .delete(function(req,res,next){

        const params = {
            Bucket: "periscopefiles",
            Delete : {
                Objects : [
                {
                    Key: `thumb${req.body.filename}`
                },
                {
                    Key: `medium${req.body.filename}`
                },
                {
                    Key: `original${req.body.filename}`
                },
                ]
            }
        };

        s3.deleteObjects(params, function(err, data){
            if(err) return next(err)
            else {
                Album.update({_id:req.body.albumId}, {$pull : { photos : {_id : req.body.photoId}}}, function(err, album){
                    if(err) return next(err);
                    res.json(album);
                });    
            }
            
        });
    });
    
module.exports = photosRouter;