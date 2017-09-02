const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtOptions = {
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),
    secretOrKey : process.env.JWT_SECRET
};

const localLogin = new LocalStrategy({ usernameField : 'email'}, function(email, password, done){
    User.findOne({email : email}, function(err, user){
        if(err) {
            return done(err, false);
        }
        if(user) {
            user.comparePassword(password, function(err, isMatch){
                if(err) {
                    err.message = 'Identification impossible';
                    return done(err);
                }
                if(!isMatch){
                    const err = new Error('Mot de passe incorrect');
                    return done(err, false);
                } else {
                    return done(null, user);
                }
            });            
        } else {
            const err = new Error('Utilisateur introuvable');
            return done(err);
        }
    });
});

const JwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    User.findById( payload.sub , function(err, user){
        if(err) return done(err, false);
        if(user){
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
});

passport.use(JwtLogin);
passport.use(localLogin);

exports.requireAuth = passport.authenticate('jwt', {session : false});
exports.requireSignin = passport.authenticate('local', {session : false});