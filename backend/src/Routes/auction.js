const express = require('express');
const router = express.Router();
const {createAuction,getAllAuctions, goAuction} = require('../Controller/auction');
router.post('/addAuctionForm', async (req, res) => {
    console.log({ body: req.body });

    const {auctionName,auctionTiming,entryAmount,startDate,
        time,participants,productList} = req.body;

    try {
        
    const newAuction = await createAuction(
        auctionName,
        auctionTiming,
        entryAmount,
        startDate,
        time,
        participants,
        productList
    );

        res.send({ auction: newAuction });
    } catch (error) {
        console.error("Error adding auction:", error);
        res.status(500).send({ error: 'Failed to add auction' });
    }
});

//get all auctions
router.get('/allAuctions', async (req, res) => {
    try {
        const auctions = await getAllAuctions();
        res.send(auctions);
    } catch (error) {
        console.error("Error fetching auctions:", error);
        res.status(500).send({ error: 'Failed to fetch auctions' });
    }
});


router.post('/joinNow', async (req, res) => {
    console.log({ body: req.body });

    const {secretToken} = req.body;

    try {
        
    const joinAuction = await goAuction(
        secretToken
    );


        res.send({ auction: joinAuction });
    } catch (error) {
        console.error("Error adding auction:", error);
        res.status(500).send({ error: 'Failed to add auction' });
    }
});


///newForm  allAuctions 

router.post('/newForm', (req,res)=>{
    const { user } = req.body;  // receive 'user' from the request

    console.log('Received user:', user);

    // You can now process/save user to database if needed
    res.status(200).json({ message: `User ${user} received successfully.` });
});


module.exports = router;

