const express = require("express");
const dbConnect = require("./config/database"); // Import the database connection module
const app = express();


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
