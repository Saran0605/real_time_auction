const express = require('express');
const router = express.Router();
const { participateAuction, getJoinedAuctions } = require('../controller/joinauction');

router.post('/joinAuction', async (req, res) => {
    console.log("Received body:", req.body);
    const { secretToken, participantName, place, phoneNo, agreement } = req.body;

    try {
        const response = await participateAuction(secretToken, participantName, place, phoneNo, agreement);
        res.json({ message: 'Successfully joined auction', data: response });
    } catch (error) {
        console.error("Error in joining auction:", error);
        res.status(500).json({ message: 'Error joining auction', error });
    }
});

router.post('/join/joinAuction', async (req, res) => {
    console.log("Received body:", req.body);
    const { secretToken, participantName, place, phoneNo, agreement } = req.body;

    try {
        const response = await participateAuction(secretToken, participantName, place, phoneNo, agreement);
        res.json({ message: 'Successfully joined auction', data: response });
    } catch (error) {
        console.error("Error in joining auction:", error);
        res.status(500).json({ message: 'Error joining auction', error });
    }
});

router.get('/myauctions', async (req, res) => {
    try {
        const joinedAuctions = await getJoinedAuctions();
        res.json(joinedAuctions);
    } catch (error) {
        console.error("Error fetching joined auctions:", error);
        res.status(500).json({ message: 'Failed to fetch joined auctions' });
    }
});

module.exports = router;
