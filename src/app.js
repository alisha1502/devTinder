const express = require('express');
const {adminAuth,userAuth} = require('./middlewares/auth');
const app = express();

// app.use('/',(req,res)=>{   //response handler
//     res.send('Hello from Dashboard my darling!')
// })

// app.use('/home',(req,res)=>{   //response handler
//     res.send('Hello from HomePage!')
// })

// app.get('/', (req, res) => {
//   res.send('Hello from Dashboard my darling!');
// });

// app.get('/user', (req, res) => {
//   res.send('Hello from User Page!');
// });

// app.get('/user/:userid/:username', (req, res) => {
//     console.log(req.query); // Log the query parameters to the console
//     console.log(req.params); // Log the route parameters to the console
//   res.send('Hello from User Page!');
// });


// app.post('/user', (req, res) => {
//   // Handle form submission logic here
//   res.send('User submitted successfully!');
// });

// app.put('/user', (req, res) => {
//   // Handle update logic here
//   res.send('User updated successfully!');
// });

// app.delete('/user', (req, res) => {
//   // Handle delete logic here
//   res.send('User deleted successfully!');
// });

//Multiple request handlers for the same route
// app.get('/user', (req, res, next) => {
//   console.log('First handler');
// //   res.send('Hello from First handler!');
//   next(); // Call the next handler 
// },(req,res,next)=>{
//     console.log('Second handler');
//     res.send('Hello from Second handler!');
//     next(); // Call the next handler
// });

//Middleware for Admin routes
// app.use('/admin', (req, res, next) => {
//     console.log("Admin Auth is being checked");
//     const AuthToken = 'xyz';
//     const isAdminAuthrorized = 'xyz' === AuthToken;
//     if(!isAdminAuthrorized){
//         res.status(401).send('Unauthorized access!');   
//     }else{
//         next(); // Call the next handler
//     }   
// });

app.use('/admin', adminAuth);


app.get('/admin/getAllData', (req, res, next) => {
    // console.log("Admin Auth is being checked");
    // const AuthToken = 'xyz';
    // const isAdminAuthrorized = 'xyz' === AuthToken;
    // if(!isAdminAuthrorized){
    //     res.status(401).send('Unauthorized access!');
    // }else{
        res.send("All data fetched successfully!");
    // }
});

app.post('/admin/deleteData', (req, res, next) => {
    // console.log("Admin Auth is being checked");
    // const AuthToken = 'xyz';
    // const isAdminAuthrorized = 'xyz' === AuthToken;
    // if(!isAdminAuthrorized){
    //     res.status(401).send('Unauthorized access!');
    // }else{
        res.send("Data deleted successfully!");
    // }
});


app.post('/user/signup', userAuth, (req, res) => {
    // Handle user signup logic here
    res.send('User signed up successfully!');
});

app.post('/user/login', (req, res) => {
    // Handle user login logic here
    res.send('User logged in successfully!');
});

app.get('/user/profile', (req, res) => {
    // Handle fetching user profile logic here
    res.send('User profile fetched successfully!');
});

app.put('/user/profile', (req, res) => {
    // Handle updating user profile logic here
    res.send('User profile updated successfully!');
});



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});