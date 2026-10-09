const express = require('express');
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user"); // Import the User model
const bycrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    try {
        validateSignUpData(req);
        const hashedPassword = await bycrypt.hash(req.body.password, 10);
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailId: req.body.emailId,
            password: hashedPassword
        });
        await user.save();
        res.send("User signed up successfully!");
    } catch (err) {
        res.status(400).send("Error signing up user: " + err.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ emailId: req.body.emailId });
        if (!user) {
            return res.status(404).send("User not found");
        }
        const isPasswordValid = await user.validatePassword(req.body.password)
        if (isPasswordValid) {
            //create JWT Token
            const token = await user.getJWT()
            //Add a token to a cookie and sent back to user
            res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });
            res.send("Login successful!");
        } else {
            return res.status(401).send("Invalid credentials");
        }

    } catch (err) {
        res.status(500).send("Error during login: " + err.message);
    }
});

authRouter.post("/logout", (req, res) => {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("Logout successfully!!")
})


module.exports = authRouter