const express = require('express');
const app = express();

// app.use('/',(req,res)=>{   //response handler
//     res.send('Hello from Dashboard my darling!')
// })

// app.use('/home',(req,res)=>{   //response handler
//     res.send('Hello from HomePage!')
// })

app.get('/', (req, res) => {
  res.send('Hello from Dashboard my darling!');
});

app.get('/user', (req, res) => {
  res.send('Hello from User Page!');
});

app.post('/user', (req, res) => {
  // Handle form submission logic here
  res.send('User submitted successfully!');
});

app.put('/user', (req, res) => {
  // Handle update logic here
  res.send('User updated successfully!');
});

app.delete('/user', (req, res) => {
  // Handle delete logic here
  res.send('User deleted successfully!');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});