const jwt = require('jwt-simple');
const User = require('../models/user');
const Album = require('../models/album');
const mailer = require('../mailer');

module.exports = {
    inviteFriend : inviteFriend,
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
            res.json(Object.assign(usageInfos[0] ? usageInfos[0] : {},{
                name : user.firstname,
                email : user.email,
                volume : user.volume,
                bucket : user.bucket
            }));            
        });
    });
}

function signin(req,res,next){
    res.json({
        token : createToken(req.user), 
        isAdmin : req.user.admin,
        canWrite : req.user.canWrite,
        canDelete : req.user.canDelete
    });
}

function signup(req,res,next){
    User.findOne({ email: req.body.email}, function(err, user){
        if(err) return next(err);
        if(user){
            return res.status(422).send('Adresse déjà utilisée');
        } else {
            
            var decodedBucket, decodedCanWrite, decodedCanDelete;
            
            if(req.body.token){
                const decodedToken = jwt.encode(req.body.token, process.env.JWT_SECRET);
                decodedBucket = decodedToken.bucket;
                decodedCanWrite = decodedToken.canWrite;
                decodedCanDelete = decodedToken.canDelete;
            }

            User.create({
                firstname : req.body.firstName,
                lastname : req.body.lastName,
                email : req.body.email,
                password : req.body.password,
                bucket : decodedBucket,
                canWrite : decodedCanWrite,
                canDelete : decodedCanDelete
            }, function(err, user){
                if(err) return next(err);
                console.log(user);
                mailer.welcome(user.email, user.firstname);
                res.json({token : createToken(user)});
            });
        }
    });
}

function inviteFriend(req,res,next){

    const timeStamp = new Date().getTime();
    
    const data = {
        bucket : req.user.bucket,
        canWrite : req.body.canWrite,
        canDelete : req.body.canDelete,
        iat : timeStamp,
        exp : timeStamp + 86400000
    };
    const token = jwt.encode(data, process.env.JWT_SECRET);
    mailer.invite(req.user.firstName, req.body.destinationName, req.body.destinationEmail, token);
    res.json({status:"ok"});

}