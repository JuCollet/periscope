const Album = require('../models/album');
const aws = require('aws-sdk');
const updateUsedVolume = require('./upload_controller').updateUsedVolume;
const s3 = new aws.S3({
        endpoint: 's3-eu-central-1.amazonaws.com',
        signatureVersion: 'v4',
        region: 'eu-central-1'
      });
const mailer = require('../mailer');

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});  

module.exports = {
    photoDelete : photoDelete,
    photoUpdate : photoUpdate,
    photoShare : photoShare
};

function photoDelete(req,res,next){
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
                }
            ]
        }
    };

    s3.deleteObjects(params, function(err, data){
        if(err) return next(err);
        Album.findByIdAndUpdate(req.body.albumId, {$pull : { photos : {_id : req.body.photoId}}}, { new : true }, function(err, album){
            if(err) return next(err);
            res.json(album);
        });    
        
    });
}

function photoUpdate(req,res,next){
    Album.findOneAndUpdate({"photos._id":req.body.photoId}, {'$set':  {
        'photos.$.tags': req.body.data.tags,
        'photos.$.photographer': req.body.data.photographer,
        'photos.$.description': req.body.data.description,
    }}, { new : true }, function(err, album){
        if(err) return next(err);
        res.json(album);
    });
}

function photoShare(req,res,next){
    mailer.photoShare(req.body, req.user.firstname);
    res.json({status:"sent"});
}