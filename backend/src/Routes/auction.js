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

///newForm

router.post('/newForm', (req,res)=>{
    const { user } = req.body;  // receive 'user' from the request

    console.log('Received user:', user);

    // You can now process/save user to database if needed
    res.status(200).json({ message: `User ${user} received successfully.` });
});


module.exports = router;

