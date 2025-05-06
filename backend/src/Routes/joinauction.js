const express = require('express');
const router = express.Router();
const { participateAuction, getJoinedAuctions } = require('../controller/joinauction');

router.post('/joinAuction', async (req, res) => {
    console.log("Received body:", req.body);
    const { secretToken, participantName, place, phoneNo, agreement, auctionName, auctionId, auctionDescription } = req.body;

    try {
        const response = await participateAuction(secretToken, participantName, place, phoneNo, agreement, auctionName, auctionId, auctionDescription);
        res.json({ message: 'Successfully joined auction', data: response });
    } catch (error) {
        console.error("Error in joining auction:", error);
        res.status(500).json({ message: 'Error joining auction', error });
    }
});

router.post('/join/joinAuction', async (req, res) => {
    console.log("Received body:", req.body);
    const { secretToken, participantName, place, phoneNo, agreement, auctionName, auctionId, auctionDescription } = req.body;

    try {
        const response = await participateAuction(secretToken, participantName, place, phoneNo, agreement, auctionName, auctionId, auctionDescription);
        res.json({ message: 'Successfully joined auction', data: response });
    } catch (error) {
        console.error("Error in joining auction:", error);
        res.status(500).json({ message: 'Error joining auction', error });
    }
});

router.get('/myauctions', async (req, res) => {
    try {
        // Accept user identifier via query string, e.g., /myauctions?email=someone@example.com
        const { email } = req.query;
        console.log("joined auctions route hit for email:", email);
        const joinedAuctions = await getJoinedAuctions(email); // Pass email to controller
        res.json(joinedAuctions);
    } catch (error) {
        console.error("Error fetching joined auctions:", error);
        res.status(500).json({ message: 'Failed to fetch joined auctions' });
    }
});

// Add this route to fetch all joined auctions (no filter)
router.get('/all', async (req, res) => {
    try {
        const joinedAuctions = await getJoinedAuctions(); // No filter, get all
        res.json(joinedAuctions);
    } catch (error) {
        console.error("Error fetching all joined auctions:", error);
        res.status(500).json({ message: 'Failed to fetch all joined auctions' });
    }
});

module.exports = router;
