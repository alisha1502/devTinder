const dns = require('dns'); dns.setServers(['8.8.8.8', '8.8.4.4']); 
const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://alishabanka_db_user:lSwT8aCEIzAEgsII@learningnode.o2r8lhh.mongodb.net/'
const dbConnect = async () =>{
 await mongoose.connect(dbURI);
}

module.exports = dbConnect;

// dbConnect().then(()=>{
//     console.log('Database connected successfully!');
// }).catch((err)=>{
//     console.log('Database connection failed!',err);
// });
