const Album = require('../models/album');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const aws = require('aws-sdk');
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
    createAlbum : createAlbum,
    deleteAlbum : deleteAlbum,
    getAlbum : getAlbum,
    getAlbums : getAlbums,
    searchAlbum : searchAlbum,
    searchPhotos : searchPhotos,
    updateAlbumThumb : updateAlbumThumb
};

const aggregateConfig = {
        $project : {
            name: 1,
            description : 1,
            createdAt : 1,            
            updatedAt : 1,
            thumb: { $arrayElemAt: [ "$photos.thumb", 0 ] },
            albumThumb : 1,
            numberOfPhotos : { $size: "$photos"}
        }
};

function createAlbum(req, res, next){
    let newAlbum = req.body;
    newAlbum.bucket = req.user.bucket;
    Album.create(newAlbum, function(err, album){
        if(err) {
            err.message = "Impossible de créer cet album";
            return next(err);
        }
        res.json(album);
    });
}

function deleteAlbum(req,res,next){
    Album.findByIdAndRemove(req.body.albumId, function(err, album){
        if(err) {
            err.message = "Impossible de supprimer cet album";
            return next(err);
        }
        
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
}

function getAlbum(req, res, next){
    Album.aggregate([
        {
            $match : { _id : ObjectId(req.params.id) }
        },
        {$project : Object.assign(aggregateConfig.$project, {photos: 1, photographer : 1})}
    ], function(err, albums){
        if(err) return next(err);
        res.json(albums[0]);
    });
}

function getAlbums(req, res, next){
    Album.aggregate([{
            $match : { bucket : req.user.bucket }
        },
        aggregateConfig], function(err, albums){
        if(err) return next(err);
        res.json(albums);
    });
}

function searchAlbum(req, res, next){
    Album.aggregate([
        {
            $match : { 
                tags : {$regex : req.body.tags, $options: 'i'},
                bucket : req.user.bucket
            }
        }, 
        aggregateConfig],function(err, albums){
        if(err) return next(err);
        res.json(albums);
    });
}

function searchPhotos(req, res, next){
    Album.aggregate([
        {
            $match : {
                bucket : req.user.bucket,
                "photos.tags" : {$regex : req.body.tags, $options: 'i'}
            },
        },
        aggregateConfig
    ],function(err, albums){
        if(err) return next(err);
        res.json(albums);
    });
}

function updateAlbumThumb(req,res,next){
    Album.findByIdAndUpdate(req.body.id, {'$set':  {'albumThumb': req.body.albumThumb}}, { new : true }, function(err, album){
        if(err) return next(err);
        res.json(album);
    });
}