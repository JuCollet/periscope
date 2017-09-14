'use strict';

const Album = require('../models/album');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    canWrite : canWrite,
    canDelete : canDelete,
    canDeletePhoto : canDeletePhoto,
    isAdmin : isAdmin
};

function canWrite(req,res,next){
    if(req.user.canWrite){
        next();
    } else {
        return res.status(403).send('Autorisations insuffisantes');
    }
}

function canDelete(req,res,next){
    console.log(req)
    if(req.user.canDelete){
        next();
    } else {
        return res.status(403).send('Autorisations insuffisantes');
    }
}

function isAdmin(req,res,next){
    if(req.user.admin){
        next();
    } else {
        return res.status(403).send('Autorisations insuffisantes');
    }
}

function canDeletePhoto(req,res,next){
    Album.aggregate([
        {$unwind : "$photos"},
        {$match : { "photos._id" : ObjectId(req.body.photoId) }},
        {$project : {"photos.uploader" : 1}}
    ], function(err, result){
        if(err) return next(err);
        if(req.user.canDelete || String(req.user._id) === String(result[0].photos.uploader)){
            next();
        } else {
            return res.status(403).send('Autorisations insuffisantes');
        }
    });
}