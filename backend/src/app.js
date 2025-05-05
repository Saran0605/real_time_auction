const express = require('express');
const cors = require('cors');
const app = express();

const port = 5004;

require('./db/mongo');
app.use(cors()); // <-- Allow all origins (or configure it below)

/* app.use(cors({
    origin: 'http://localhost:5173', // only allow this origin
    credentials: true
  })); */

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/auction', require('./Routes/auction'));
app.use('/auction/join', require('./Routes/joinauction'));

app.get('/', (req,res)=>{
    res.send('Hello World!');
})

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})