const express = require('express');
const { userAuth } = require('../middlewares/auth');
const bcrypt = require("bcrypt");
const { validateProfileEditData, validateStrongPassword } = require('../utils/validation')
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user)
    } catch (err) {
        res.status(500).send("Error fetching users: " + err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateProfileEditData(req)) {
            throw new Error("Profile can not be updated")
        }

        const loggedInUser = req.user;
        Object.keys(req.body).every((field) => loggedInUser[field] = req.body[field])
        await loggedInUser.save();

        res.json({
            message: `${loggedInUser.firstName}, your profile is updated successfully`,
            data: loggedInUser
        })

    } catch (err) {
        res.status(500).send("Error fetching users: " + err.message);
    }
})

profileRouter.patch("/profile/changePassword", userAuth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = req.user;

        if (!currentPassword || !newPassword) {
            throw new Error("Both currentPassword and newPassword are required");
        }
        const isCurrentValid = await user.validatePassword(currentPassword)
        if (!isCurrentValid) {
            return res.status(401).send("Current password is incorrect");
        }
        validateStrongPassword(newPassword)
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.cookie("token", null, { expires: new Date(Date.now()) });
        res.send("Password updated successfully. Please login again with new password")
    } catch (err) {
        res.status(400).send("Error updating password: " + err.message);
    }
})

module.exports = profileRouter;