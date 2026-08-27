const express = require("express");
const dbConnect = require("./config/database"); // Import the database connection module
const app = express();
const User = require("./models/user"); // Import the User model

app.use(express.json()); // Middleware to parse JSON request bodies


app.post("/signup", async (req, res) => {
  const user = new User(req.body);

try{
  await user.save();
  res.send("User signed up successfully!");
}catch(err){
  res.status(500).send("Error signing up user: " + err.message);
}
});

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
