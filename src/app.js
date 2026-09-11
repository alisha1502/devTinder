const express = require("express");
const dbConnect = require("./config/database"); // Import the database connection module
const app = express();
const User = require("./models/user"); // Import the User model
const { validateSignUpData, validateEditUserData } = require("./utils/validation");
const bycrypt = require("bcrypt");

app.use(express.json()); // Middleware to parse JSON request bodies


app.post("/signup", async (req, res) => {
try{
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
}catch(err){
  res.status(400).send("Error signing up user: " + err.message);
}
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.body.emailId });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isPasswordValid = await bycrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials");
    }
    res.send("Login successful!");
  } catch (err) {
    res.status(500).send("Error during login: " + err.message);
  }
});

//finding users with same emailId
app.get("/users", async (req, res) => {
  try {
    const users = await User.findOne({emailId: req.body.emailId});
    if (users) {
      res.json(users);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).send("Error fetching user: " + err.message);
  }
});

//returning all the users
app.get('/feed', async (req, res)=>{
  try{
    const users = await User.find({});
    if(users){
      res.send(users);
    }else{
      res.status(404).send("No users found");
    }
  }catch(err){
    res.status(500).send("Error fetching users: " + err.message);
  }
})

//delete a user
app.delete('/user', async (req, res)=>{
  const userId = req.body.userId;
  try{
    const user = await User.findByIdAndDelete(userId);
    if(user){
      res.send("User deleted successfully");
    }else{
      res.status(404).send("User not found");
    } 

  }catch(err){
    res.status(500).send("Error deleting user: " + err.message);
  }

})

//updating a user
app.patch('/user', async (req, res)=>{
  const userId = req.body.userId;
  const updateData = req.body;
  try{
    if (!validateEditUserData(req)) {
      throw new Error('Update not allowed on these fields');
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {returnDocument: 'after', runValidators: true});
    if(updatedUser){
      res.send(updatedUser);
    }else{
      res.status(404).send("User not found");
    }
  }catch(err){
    res.status(400).send("Error updating user: " + err.message);
  }
})

//updating a user with emailId instead of userId
app.patch('/updateUserByEmail', async (req, res)=>{
  const emailId = req.body.emailId;
  const updateData = req.body;
  try{
    const updatedUser = await User.findOneAndUpdate({emailId: emailId}, updateData, {returnDocument: 'after'});
    if(updatedUser){
      res.send(updatedUser);    
  }else{
      res.status(404).send("User not found");
    }
  }catch(err){
    res.status(500).send("Error updating user: " + err.message);
  } 
})
dbConnect()
  .then(() => {
    console.log("Database connected successfully!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database connection failed!", err);
  });
