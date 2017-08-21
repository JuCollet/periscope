const Album = require('../models/album');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const aggregateConfig = {
        $project : {
            name: 1,
            description : 1,
            updatedAt : 1,
            albumThumb : 1,
            numberOfPhotos : { $size: "$photos"}
        }
    };

exports.getAlbum = function(req, res, next){
    Album.aggregate([
        {
            $match : { _id : ObjectId(req.params.id) }
        },
        {$project : Object.assign(aggregateConfig.$project, {photos: 1, photographer : 1})}
    ], function(err, albums){
        if(err) return next(err);
        res.json(albums[0]);
    });
};

exports.getAlbums = function(req, res, next){
    Album.aggregate([aggregateConfig], function(err, albums){
        if(err) return next(err);
        res.json(albums);
    });
};

exports.searchAlbum = function(req, res, next){
    Album.aggregate([
        {
            $match : { tags : {$regex : req.body.tags, $options: 'i'}}
        }, 
        aggregateConfig
    ],function(err, albums){
        if(err) return next(err);
        res.json(albums);
    });
};

exports.searchPhotos = function(req, res, next){
    Album.aggregate([
        {
            $match : { "photos.tags" : {$regex : req.body.tags, $options: 'i'}},
        },
        aggregateConfig
    ],function(err, albums){
        if(err) return next(err);
        res.json(albums);
    });
};