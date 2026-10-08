const mongoose = require('mongoose');
const validator = require('validator');
const bycrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const passwordRules = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
    },
    contactNumber:{
        type: String,
        trim: true,  
    },
    age:{
        type: Number,
        min: [18, 'You must be at least 18'],
    },
    emailId:{
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email address: ' + value);
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        validate(value){
        if(!validator.isStrongPassword(value, passwordRules)){
            throw new Error(
              `Password must be at least ${passwordRules.minLength} characters and include ` +
              `at least ${passwordRules.minUppercase} uppercase letter, ` +
              `${passwordRules.minLowercase} lowercase letter, ` +
              `${passwordRules.minNumbers} number, and ` +
              `${passwordRules.minSymbols} symbol.`
            );
        }
    }
    },
    gender:{
        type: String,
        // validate(value){
        //     const validGenders = ['Male', 'Female', 'Other'];
        //     if(!validGenders.includes(value)){
        //         throw new Error('Invalid gender value. Must be "Male", "Female", or "Other".'); 
        //     }
        //     return validGenders.includes(value);  
        // }
        enum: {
            values: ['Male', 'Female', 'Other'],
            message: `{VALUE} is not a valid gender`
        }
    },
    skills:{
        type: [String],
        validate(value){
            if(value.length > 10){
                throw new Error('Skills cannot exceed 10 items');
            }
        }
    },
    profilePicture:{
        type: String,
        validate(value){
            if(value && !validator.isURL(value)){
                throw new Error('Invalid photo URL: ' + value);
            }
        }
    },
    bio:{
        type: String,
        default: "Hey there! I'm using DevTinder.",
        maxLength: 200,
    },
},{
    timestamps: true
});

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id: user._id}, "DEVTinder$346#",{ expiresIn: '8h' })
    return token;
}

userSchema.methods.validatePassword = async function(passwordEnteredByUser){
    const user = this;
    const hashedPassword = user.password
    const isPasswordValid = await bycrypt.compare(passwordEnteredByUser, hashedPassword);
    return isPasswordValid
}

module.exports = mongoose.model('User', userSchema);