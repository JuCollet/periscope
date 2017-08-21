const jwt = require('jwt-simple');
const User = require('../models/user');

function createToken(user){
    const timeStamp = new Date().getTime();
    return jwt.encode({ sub: user._id, iat: timeStamp }, process.env.JWT_SECRET);
}

exports.signup = function(req,res,next){
    User.findOne({ email: req.body.email}, function(err, user){
        if(err) return next(err);
        if(user){
            return res.status(422).send('{error : "Email in use}');
        } else {
            User.create({
                firstname : req.body.firstName,
                lastname : req.body.lastName,
                email : req.body.email,
                plan : req.body.plan,
                password : req.body.password
            }, function(err, user){
                if(err) return next(err);
                res.send(user);
            });
        }
    });
};

exports.signin = function(req,res,next){
    User.findOne({ email : req.body.email }, function(err, user){
        if(err) return next(err);
        if(user){
            res.json({token : createToken(user)});
        } else {
            res.json({ status : "No user found"});
        }
    });
};