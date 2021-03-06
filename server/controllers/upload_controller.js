'use strict';

const express = require('express'),
      Album = require('../models/album'),
      aws = require('aws-sdk'),
      fs = require('fs'),
      sharp = require('sharp'),
      s3 = new aws.S3({
        endpoint: 's3-eu-central-1.amazonaws.com',
        signatureVersion: 'v4',
        region: 'eu-central-1'
      });

      aws.config.update({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      });

module.exports = {
    sendFiles : sendFiles
};

process.env.UV_THREADPOOL_SIZE = 1;
sharp.concurrency(1);
sharp.cache(50);

function sendFiles (req,res,next){

    const files = req.files;
    const id = req.params.id;

    const sendToS3 = function(buffer, key){
        
        const params = {
            Body: buffer,
            Bucket: "periscopefiles",
            Key: `usersFiles/${key}`,
            ACL: 'public-read'
        };
        
        s3.putObject(params, function(err, data) {
            if(err) {
                return res.status(500).send('Une erreur est survenue');
            }
            buffer = null;
        });
    };
    
    const endPhotoProcess = function(filename, filePath, imgWidth, imgHeight, imgSize){
        
        let newPhoto = {
            uploader: req.user._id,
            filename: `${id}${filename}`,
            thumb: `${process.env.S3_URL}usersFiles/thumb${id}${filename}`,
            medium: `${process.env.S3_URL}usersFiles/medium${id}${filename}`,
            original: `${process.env.S3_URL}usersFiles/original${id}${filename}`,
            width: imgWidth,
            height: imgHeight,
            size: imgSize
        };
        
        Album.findByIdAndUpdate(id, { $push: { photos: newPhoto }}, { new : true }, function(err, album){
            if(err) {
                return res.status(500).send('Une erreur est survenue');
            }
            fs.unlink(filePath, function(err){
                if(err){
                    console.error("unable to delete temp files");
                }
            });
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
                endPhotoProcess(file.filename, file.path, metadata.width, metadata.height, file.size);
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
    
    res.json({status:"Traitement en cours..."});
    
}