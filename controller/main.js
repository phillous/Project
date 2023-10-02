const express = require('express')
const user = require('../model/Users')

const {StatusCodes, UnauthenticatedError} = require('http-status-codes');
const {BadRequestError} = require('../error');

const passport = require('passport')

const register = (req,res)=> {
    res.render('signup.ejs')
}

const signIn = (req,res)=> {
    res.render('index.ejs')
}

const signupUser = async(req,res)=>{
        const{storeName, email, password, phoneNumber} = req.body;
        if(!storeName){
            throw new Error("Please provide storeName")
        };
        if(!email){
            throw new Error("Please provide email")
        };
        if(!password){
            throw new Error("Please provide password") 
        };
        if(!phoneNumber){
            throw new Error("Please provide phoneNumber") 
        }
        await user.create(req.body);
        
        res.render('index.ejs')       
}

const productCategory = async(req, res, next) =>{
    if (req.isAuthenticated()) {
        res.send('<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>');
    } else {
        res.send('<h1>You are not authenticated</h1><p><a href="/login">Login</a></p>');
    }
        

        
}

const loginUser = async(req,res, next)=> {
    passport.authenticate('local',  {
        successRedirect: '/productCategories',
        failureRedirect: '/signIn',
        failureFlash: true,
      })(req, res, next);
}

module.exports = {
    register,
    signIn,
    signupUser,
    productCategory,
    loginUser,
}