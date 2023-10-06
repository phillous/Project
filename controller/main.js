const express = require('express')
const user = require('../model/Users')
require('dotenv').config();
const jwt = require('jsonwebtoken')

const {StatusCodes, UnauthenticatedError} = require('http-status-codes');
const {BadRequestError} = require('../error');

const maxAge = 3 * 24 * 60 * 60

const handleErrors = (err) => {
    console.log(err.message, err.code)

    let errors = {
        email: '',
        password: ''
    }

    if(err.message === "incorrect email"){
       errors.email = "That email is not registered"; 
    }

    // incorrect password
    if(err.message === 'incorrect password') {
        errors.password = 'That password is incorrect';
    } 

    // duplicate email error
    if(err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // validation errors
    if(err.message.includes("user validation failed")) {
        //console.log(err);
        Object.values(err.errors).forEach(({ properties }) => {
            //console.log(val);
            //console.log(properties);
            errors[properties.path] = properties.message;
        })

        return errors;
    }
}


const register = (req,res)=> {
    console.log("hey bay")
    res.render('signup.ejs')
}

const signIn = (req,res)=> {
    res.render('index.ejs')
}

const signupUser = async(req,res)=>{
    const{storeName, email, password, phoneNumber} = req.body;
    try{
        console.log("hey bay")
        await user.create(req.body);
        res.render('index.ejs')
    }catch(err){
        console.log(err)
        
    }       
}

const productCategory = async(req, res, next) =>{
        res.render('productCategory.ejs')    
}

const loginUser = async(req,res)=> {

    console.log("hey bay")
    const {email, password} = req.body
    try{
        console.log('hi')
        const userLog = await user.findOne(email);
        if(!userLog){
            throw new Error(err)
        }else {
            console.log({userLog})
        }
        const isPassword = await userLog.comparePassword(password)
        if(!isPassword){
            throw new Error(err)
        }
        const token = await userLog.createJWT()      
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge})
        res.render('productCategory.ejs')
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    register,
    signIn,
    signupUser,
    productCategory,
    loginUser,
}