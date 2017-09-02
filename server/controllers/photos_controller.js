const Album = require('../models/album');
const aws = require('aws-sdk');
const updateUsedVolume = require('./upload_controller').updateUsedVolume;
const s3 = new aws.S3({
        endpoint: 's3-eu-central-1.amazonaws.com',
        signatureVersion: 'v4',
        region: 'eu-central-1'
      });

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});  

module.exports = {
    photoDelete : photoDelete,
    tagsUpdate : tagsUpdate
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
            updateUsedVolume(req,res,next,album);
        });    
        
    });
}

function tagsUpdate(req,res,next){
    Album.findOneAndUpdate({"photos._id":req.body.photoId}, {'$set':  {'photos.$.tags': req.body.data}}, { new : true }, function(err, album){
        if(err) return next(err);
        res.json(album);
    });
}