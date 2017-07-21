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

    const files = req.files;
    const id = req.params.id;
    const nbrFiles = files.length;
    let position = 0;
    
    const imgProcessing = function(nextPosition){
        
        let currentFile = files[nextPosition];
        let processed = 0;
        
        for(let i = 0; i < imgProcess.length; i ++){

            lwip.open(currentFile.path, function(err, image){
                if(err) return next(err);
                
                console.log("processing " + currentFile.path + " : "+imgProcess[i].name);
                
                let scale = scaleFinder(image.width(), image.height(), imgProcess[i].maxSize, imgProcess[i].onlyWidth, imgProcess[i].noResize);
                const imgInfos = {
                    width: image.width(),
                    height: image.height()
                };
                
                image.batch()
                .scale(scale)
                .toBuffer('jpg', {quality:imgProcess[i].quality}, function(err, buffer){
                    if(err) return next(err);
                    
                    processed++;
                    
                    // Send file to S3
                    
                    const params = {
                        Body: buffer,
                        Bucket: "periscopefiles",
                        Key: imgProcess[i].name+id+currentFile.filename,
                        ACL: 'public-read'
                    };
                    
                    s3.putObject(params, function(err, data) {
                        if(err) return next(err);
                        buffer = null;
                    });
                    
                    // Check if every image version has been processed;
                    if(processed === imgProcess.length){
                        
                        // Create a new object with uploaded files links;
                        let newPhoto = {
                            thumb: `${process.env.S3_URL}thumb${id}${currentFile.filename}`,
                            medium: `${process.env.S3_URL}medium${id}${currentFile.filename}`,
                            original: `${process.env.S3_URL}original${id}${currentFile.filename}`,
                            width: imgInfos.width,
                            height: imgInfos.height
                        };

                        // Update the database by pushing the newPhoto object;
                        Album.findByIdAndUpdate(id, { $push: { photos: newPhoto }}, function(err, album){
                            if(err) return next(err);
                            
                            // As the current file as been processed and sent to S3,
                            // delete the local temp file;
                            fs.unlink(currentFile.path);                             
                            
                            // After the files have been pushed to the database,
                            // repeat the processing function for remaining files.
                            if(nextPosition < nbrFiles-1){
                                position++;
                                imgProcessing(position);    
                            }
                            
                        });
                        
                    }
                    
                }); // end buffer write
            
            }); // end lwip open
        
        } // end for loop

    }; // end imgProcessing;

    // First function calling for image with index 0;
    imgProcessing(position);

    res.json({"Photos":"ok"});

  });

module.exports = uploadRouter;