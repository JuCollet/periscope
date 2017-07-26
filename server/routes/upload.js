'use strict';

const express = require('express'),
      Album = require('../models/album'),
      uploadRouter = express.Router(),
      multer  = require('multer'),
      aws = require('aws-sdk'),
      fs = require('fs'),
      sharp = require('sharp'),
      storage = multer.diskStorage({
          destination: function (req, file, cb) {
            cb(null, './');
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

uploadRouter.route('/:id')

  .put(upload.array('photos', 50), function(req,res,next){

    const files = req.files;
    const id = req.params.id;
    let filesCounter = 0;
    
    const sendToS3 = function(buffer, key){
        
        const params = {
            Body: buffer,
            Bucket: "periscopefiles",
            Key: key,
            ACL: 'public-read'
        };
        
        s3.putObject(params, function(err, data) {
            if(err) return next(err);
            buffer = null;
        });
    };
    
    const endPhotoProcess = function(filename, filePath, imgWidth, imgHeight){
        
        let newPhoto = {
            filename: `${id}${filename}`,
            thumb: `${process.env.S3_URL}thumb${id}${filename}`,
            medium: `${process.env.S3_URL}medium${id}${filename}`,
            original: `${process.env.S3_URL}original${id}${filename}`,
            width: imgWidth,
            height: imgHeight
        };
        
        Album.findByIdAndUpdate(id, { $push: { photos: newPhoto }}, { new : true }, function(err, album){
            if(err) return next(err);
            fs.unlink(filePath);
            filesCounter++;                
            if(filesCounter === files.length){
                res.json(album);                
            }
        });

    };
    
    files.forEach(function(file){
        let counter = 0;
        const image = sharp(file.path).rotate();
        
        const finalizeProcess = function(){
            image.metadata().then(function(metadata){
                if(metadata.orientation && metadata.orientation > 4 && metadata.orientation < 9){
                    const heightTemp = metadata.height;
                    metadata.height = metadata.width;
                    metadata.width = heightTemp;
                }
                endPhotoProcess(file.filename, file.path, metadata.width, metadata.height);
                console.log("width : "+metadata.width)
                console.log("orientation : "+metadata.orientation)
            });
        };

        image.clone().resize(320,320).max().toFormat('jpeg').toBuffer().then(function(buffer){
            sendToS3(buffer, `thumb${id}${file.filename}`);
            counter++;
            if(counter === 3) finalizeProcess();
        });
        
        image.clone().resize(1600,1600).max().toFormat('jpeg').toBuffer().then(function(buffer){
            sendToS3(buffer, `medium${id}${file.filename}`);
            counter++;
            if(counter === 3) finalizeProcess();
        });        
        
        image.clone().toFormat('jpeg').toBuffer().then(function(buffer){
            sendToS3(buffer, `original${id}${file.filename}`);
            counter++;
            if(counter === 3) finalizeProcess();
        });             
            
    });

  });

module.exports = uploadRouter;