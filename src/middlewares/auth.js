const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error("Token is not valid")
        }
        const decodedObj = await jwt.verify(token,"DEVTinder$346#");
        const {_id} = decodedObj;
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not found")
        }
        req.user = user
        next();
    }catch(err){
        res.status(500).send("Error fetching users: " + err.message);
    }
    
};

module.exports = {
    userAuth
};