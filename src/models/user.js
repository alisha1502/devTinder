const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true  
    },
    lastName:{
        type: String,
        required: true
    },
    contactNumber:{
        type: String,
        required: true  
    },
    age:{
        type: Number,
    },
    emailId:{
        type: String,
    },
    password:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,      
    },
    gender:{
        type: String,
        validate(value){
            const validGenders = ['Male', 'Female', 'Other'];
            if(!validGenders.includes(value)){
                throw new Error('Invalid gender value. Must be "Male", "Female", or "Other".'); 
            }
            return validGenders.includes(value);  
        }
    },
    skills:{
        type: [String],
    },
    profilePicture:{
        type: String,
    },
    bio:{
        type: String,
        default: "Hey there! I'm using DevTinder."
    },
},{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);