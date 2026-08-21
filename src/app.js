const express = require('express');
const app = express();

app.use('/',(req,res)=>{   //response handler
    res.send('Hello from Dashboard my darling!')
})

app.use('/home',(req,res)=>{   //response handler
    res.send('Hello from HomePage!')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});