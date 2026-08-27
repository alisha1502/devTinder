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
        required: true      
    }
});

module.exports = mongoose.model('User', userSchema);