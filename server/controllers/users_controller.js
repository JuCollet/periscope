const jwt = require('jwt-simple');
const User = require('../models/user');
const Album = require('../models/album');

module.exports = {
    getInfos : getInfos,
    signin : signin,
    signup : signup,
};

function createToken(user){
    const timeStamp = new Date().getTime();
    return jwt.encode({ sub: user._id, iat: timeStamp }, process.env.JWT_SECRET);
}

function getInfos(req,res,next){
    User.findById(req.user._id, function(err, user){
        if(err){
            err.message = "Utiliseur introuvable";
            return next(err);
        }
        Album.aggregate([
            { $match : { bucket : user.bucket}},
            { $group : {
                _id : null,
                "numberOfAlbums" : {
                    $sum : 1
                },
                "numberOfPhotos" : {
                    $sum : {
                        $size : "$photos"
                    },
                },
                "usedVolume" : {
                    $sum : {
                        $sum : "$photos.size"
                    }
                }
            }}
            ], function(err, usageInfos){
            if(err){
                err.message = "Impossible d'obtenir plus d'infos";
                return next(err);
            }
            res.json(Object.assign(usageInfos[0],{
                name : user.firstname,
                email : user.email,
                volume : user.volume,
                bucket : user.bucket
            }));            
        });
    });
}

function signin(req,res,next){
    res.json({token : createToken(req.user)});
}

function signup(req,res,next){
    User.findOne({ email: req.body.email}, function(err, user){
        if(err) return next(err);
        if(user){
            return res.status(422).send('Adresse déjà utilisée');
        } else {
            User.create({
                firstname : req.body.firstName,
                lastname : req.body.lastName,
                email : req.body.email,
                password : req.body.password,
                bucket : req.body.bucket
            }, function(err, user){
                if(err) return next(err);
                res.json({token : createToken(user)});
            });
        }
    });
}