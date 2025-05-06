const express = require('express');
const cors = require('cors');
const path = require('path'); // <-- Add this line
const app = express();

const port = 5004;

require('./db/mongo');
app.use(cors()); // <-- Allow all origins (or configure it below)

/* app.use(cors({
    origin: 'http://localhost:5173', // only allow this origin
    credaentaials: true
  })); */

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auction', require('./Routes/auction'));
const joinauctionRoutes = require('./Routes/joinauction');
app.use('/joinauction', joinauctionRoutes);

app.get('/', (req,res)=>{
    res.send('Hello World!');
})

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})