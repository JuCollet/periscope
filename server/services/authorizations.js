'use strict';

module.exports = {
    canWrite : canWrite,
    canDelete : canDelete,
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