require('dotenv').config();
const dns = require('dns'); dns.setServers(['8.8.8.8', '8.8.4.4']); 
const mongoose = require('mongoose');
const dbURI = process.env.MONGO_URI;
const dbConnect = async () =>{
 await mongoose.connect(dbURI);
}

module.exports = dbConnect;

// dbConnect().then(()=>{
//     console.log('Database connected successfully!');
// }).catch((err)=>{
//     console.log('Database connection failed!',err);
// });
