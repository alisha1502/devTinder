const express = require('express');
const {userAuth} = require("../middlewares/auth");

const connectionReqRouter = express.Router();

connectionReqRouter.post("/sendConnectionReq", userAuth, async(req,res) =>{
  const user = req.user
  res.send(user.firstName + " has successfully sent the connect request")
})

module.exports = connectionReqRouter;