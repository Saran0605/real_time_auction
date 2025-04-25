const express = require('express');
const router = express.Router();

router.post('/addAuctionForm', async (req, res) => {
    console.log({ body: req.body });

    const {
        auctionName,
        auctionTiming,
        entryAmount,
        startDate,
        time,
        participants,
        productList
    } = req.body;

    try {
        const newAuction = await Auction.create({
            name: auctionName,
            timing: auctionTiming,
            entryAmount,
            startDate,
            time,
            participants,
            productList
        });

        res.send({ auction: newAuction });
    } catch (error) {
        console.error("Error adding auction:", error);
        res.status(500).send({ error: 'Failed to add auction' });
    }
});

module.exports = router;

