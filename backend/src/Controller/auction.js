import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Auction from '../Models/auction.js';
import multer from 'multer';

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer storage and file handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); // Use relative path, no leading slash
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Store file with a unique name (timestamp + original name)
    }
});

// Create a multer instance with storage configuration
const upload = multer({ storage: storage });

// Auction creation function
export async function createAuction(auctionName, auctionTiming, entryAmount, startDate, time, participants, productList, image, description) {
    // Store only the filename for the image
    const imageUrl = image ? image.filename : null;
    const newAuction = await Auction.create({
        name: auctionName,
        timing: auctionTiming,
        entryAmount,
        startDate,
        time,
        participants,
        productList,
        description, // <-- Store description
        imageUrl // Store only the filename in the database
    });
    return {
        name: auctionName,
        timing: auctionTiming,
        entryAmount,
        startDate,
        time,
        participants,
        productList,
        description, // <-- Return description
        imageUrl // Add image URL to the response
    };
}

// Fetch all auctions
export async function getAllAuctions() {
    try {
        const auctions = await Auction.find({});
        return auctions;
    } catch (error) {
        console.error("Error fetching auctions:", error);
        throw new Error('Failed to fetch auctions');
    }
}

// Auction joining functionality
export async function goAuction(secretToken) {
    const newAuction = await Auction.create({
        secretToken
    });
    return {
        secretToken
    };
}

// Export the multer instance for use in routes
export { upload };
