import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './Routes/auth.js';

const app = express();
const port = 5004;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import './db/mongo.js';
app.use(cors());

app.use(express.json());
app.use('/api/auth', authRoutes);

app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

import auctionRoutes from './Routes/auction.js';
app.use('/auction', auctionRoutes);

import joinauctionRoutes from './Routes/joinauction.js';
app.use('/joinauction', joinauctionRoutes);

app.get('/', (req,res)=>{
    res.send('Hello World!');
})

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});