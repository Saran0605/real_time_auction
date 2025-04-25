const express = require('express');
const app = express();

const port = 5004;

require('./db/mongo');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/auction', require('./Routes/auction'));

app.get('/', (req,res)=>{
    res.send('Hello World!');
})

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})