const jwt = require('jwt-simple');
const User = require('../models/user');

module.exports = {
    signin : signin,
    signup : signup
};

function createToken(user){
    const timeStamp = new Date().getTime();
    return jwt.encode({ sub: user._id, iat: timeStamp }, process.env.JWT_SECRET);
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
                password : req.body.password
            }, function(err, user){
                if(err) return next(err);
                res.json({token : createToken(user)});
            });
        }
    });
}