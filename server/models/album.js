'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const photoSchema = new mongoose.Schema({
    thumb : String,
    medium : String,
    original : String,
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
    tags : [String]
    },
    {
      timestamps:true
    });

module.exports = mongoose.model('Album', albumSchema);