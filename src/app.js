const express = require("express");
const dbConnect = require("./config/database"); // Import the database connection module
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser());

const authRouter = require('./routes/auth');
const connectionReqRouter = require('./routes/connectionRequest');
const profileRouter = require('./routes/profile');

app.use("/", authRouter);
app.use("/", connectionReqRouter);
app.use('/', profileRouter);

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
