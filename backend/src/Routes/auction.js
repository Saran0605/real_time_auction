import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { createAuction, getAllAuctions, goAuction } from '../Controller/auction.js';
import FinalBid from '../models/finalbid.js';  // Create this model file

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set up multer storage for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/addAuctionForm', upload.single('image'), async (req, res) => {
    console.log({ body: req.body });

    const { auctionName, auctionTiming, entryAmount, startDate, time, participants, productList, description } = req.body;

    try {
        // Include the image file uploaded
        const newAuction = await createAuction(
            auctionName,
            auctionTiming,
            entryAmount,
            startDate,
            time,
            participants,
            productList,
            req.file,
            description // <-- Pass description to controller
        );

        res.send({ auction: newAuction });
    } catch (error) {
        console.error("Error adding auction:", error);
        res.status(500).send({ error: 'Failed to add auction' });
    }
});

// GET route for fetching all auctions
router.get('/allAuctions', async (req, res) => {
    try {
        const auctions = await getAllAuctions();
        res.send(auctions);
    } catch (error) {
        console.error("Error fetching auctions:", error);
        res.status(500).send({ error: 'Failed to fetch auctions' });
    }
});

// POST route for joining an auction
router.post('/joinNow', async (req, res) => {
    console.log({ body: req.body });

    const { secretToken } = req.body;

    try {
        const joinAuction = await goAuction(secretToken);
        res.send({ auction: joinAuction });
    } catch (error) {
        console.error("Error adding auction:", error);
        res.status(500).send({ error: 'Failed to join auction' });
    }
});

router.post('/finalBid', async (req, res) => {
    try {
        const { auctionId, bidderName, finalAmount, auctionName } = req.body;
        
        const finalBid = new FinalBid({
            auctionId,
            bidderName,
            finalAmount,
            auctionName,
            timestamp: new Date()
        });

        await finalBid.save();
        res.json({ success: true, message: 'Final bid stored successfully' });
    } catch (error) {
        console.error('Error storing final bid:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
