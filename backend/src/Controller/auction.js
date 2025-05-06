const fs = require('fs');
const path = require('path');
const Auction = require('../Models/auction');
const multer = require('multer'); // ✅ Import multer

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
async function createAuction(auctionName, auctionTiming, entryAmount, startDate, time, participants, productList, image) {
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
        imageUrl // Add image URL to the response
    };
}

// Fetch all auctions
async function getAllAuctions() {
    try {
        const auctions = await Auction.find({});
        return auctions;
    } catch (error) {
        console.error("Error fetching auctions:", error);
        throw new Error('Failed to fetch auctions');
    }
}

// Auction joining functionality
async function goAuction(secretToken) {
    const newAuction = await Auction.create({
        secretToken
    });
    return {
        secretToken
    };
}

// Export the functions
module.exports = {
    createAuction,
    getAllAuctions,
    goAuction,
    upload // Export the multer instance for use in routes
};
