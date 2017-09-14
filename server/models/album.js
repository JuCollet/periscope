'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const photoSchema = new mongoose.Schema({
    filename : String,
    uploader : {
      type: Schema.ObjectId,
      ref: 'User'
    },
    thumb : String,
    medium : String,
    original : String,
    description : String,
    photographer : String,
    width: Number,
    height: Number,
    size: Number,
    tags : [String],
    rating : {
        type: Number,
        max: 5,
        min: 1,
        default: 1
    }
});

const albumSchema = new mongoose.Schema({
    name : String,
    photographer : String,
    description : String,
    photos : [photoSchema],
    tags : [String],
    albumThumb : String,
    bucket : String
    },
    {
      timestamps:true
    });
    
module.exports = mongoose.model('Album', albumSchema);