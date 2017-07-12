'use strict';

const express = require('express'),
      Album = require('../models/album'),
      uploadRouter = express.Router(),
      multer  = require('multer'),
      aws = require('aws-sdk'),
      fs = require('fs'),
      lwip = require('lwip'),
      storage = multer.diskStorage({
          destination: function (req, file, cb) {
            cb(null, './uploads');
        },
          filename: function (req, file, cb) {
            cb(null, Date.now()+'.jpg');
        }
      }),
      upload = multer({ storage: storage }),
      s3 = new aws.S3({
        endpoint: 's3-eu-central-1.amazonaws.com',
        signatureVersion: 'v4',
        region: 'eu-central-1'
      });

      aws.config.update({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      });
      
const scaleFinder = function(imgWidth, imgHeight, maxSize, onlyWidth, noResize){
    if(noResize){
        return 1;
    } else if(onlyWidth){
        return Math.round((maxSize / imgWidth) * 100) / 100;
    } else {
        return Math.round( (maxSize / Math.min(imgWidth, imgHeight)) * 100 ) / 100 < 1 ? Math.round( (maxSize / Math.min(imgWidth, imgHeight)) * 100 ) / 100 : 1;        
    }
};

const imgProcess = [
    {
        name : "thumb",
        maxSize : 320,
        quality : 100,
        onlyWidth : true,
        noResize : false
    },
    {
        name : "medium",
        maxSize : 1600,
        quality: 80,
        onlyWidth : false,
        noResize : false
    },
    {
        name : "original",
        maxSize : 0,
        quality: 100,
        onlyWidth : false,
        noResize : true
    },        
];

uploadRouter.route('/:id')

  .put(upload.array('photos', 50), function(req,res,next){
    
    req.files.forEach(function(file){
    
    for(let i = 0; i < imgProcess.length; i ++){
        require('lwip').open(file.path, function(err, image){
            if(err) return next(err);
            
            let scale = scaleFinder(image.width(), image.height(), imgProcess[i].maxSize, imgProcess[i].onlyWidth, imgProcess[i].noResize);
            
            image.batch()
            .scale(scale)
            .toBuffer('jpg', {quality:imgProcess[i].quality}, function(err, buffer){
                if(err) return next(err);
                
                const params = {
                    Body: buffer, 
                    Bucket: "periscopefiles", 
                    Key: imgProcess[i].name+req.params.id+file.filename,
                    ACL: 'public-read'
                };

                s3.putObject(params, function(err, data) {
                    
                    if(err) return next(err);

                });
                
            });
        
        });
        
    }
    
    let newPhoto = {
        thumb: `${process.env.S3_URL}thumb${req.params.id}${file.filename}`,
        medium: `${process.env.S3_URL}medium${req.params.id}${file.filename}`,
        original: `${process.env.S3_URL}original${req.params.id}${file.filename}`,
    };    
    
    Album.findByIdAndUpdate(req.params.id, { $push: { photos: newPhoto }}, function(err, album){
        if(err) return next(err);
    });
    
    fs.unlink(file.path);

    });
    
    res.json({"Photos":"ok"});
    
  });
  
module.exports = uploadRouter;