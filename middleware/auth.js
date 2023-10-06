require('dotenv').config();

const jwt = require('jsonwebtoken')

const User = require('../model/Users')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err){
                res.redirect('/login')
            }else{
                next();
            }
        })
    }else{
        res.redirect('/login')
    }
}

const checkUser = (req,res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, async function(err, decodedToken){
            if(err){
                res.locals.user = null
                next();
            } else{
                let user = await User.findById(decodedToken.user_id)
                res.locals.user = user
                next()
            }
        });
    }else {
        res.locals.user = null;
        next();
    }
}

module.exports = {
    requireAuth,
    checkUser,
}