const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const UserSchema = new mongoose.Schema({
    storeName:{
        type: String,
        required:[true, 'Please enter your storeName']
    },
    email:{
        type: String,
        required: [true, 'Please enter your email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique:true,

    },
    password: {
        type:String,
        required:[true, 'Please provide name'],
        minlength: 6,
    },
    phoneNumber: {
        type: Number,
        required: true,
        minlength: 11,
    }
});

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next();
});

UserSchema.method.createJWT = async function(){
    return await jwt.sign({userId: this._id, name:this.storeName},process.env.JWT_SECRET, {expiresIn:process.env.JWT_LIFETIME});
}

UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
}


module.exports = mongoose.model('data', UserSchema)  