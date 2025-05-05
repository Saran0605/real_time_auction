const express = require('express');
const router = express.Router();
const { participateAuction } = require('../Controller/joinauction');

// POST route to handle form submission for joining the auction
router.post('/joinAuction', async (req, res) => {
    console.log({ body: req.body });
    const { participantName, place, phoneNo, agreement } = req.body;

    try {
        // Log the received data to the console
        console.log('Received form data:', { participantName, place, phoneNo, agreement });

        // Call the controller function to store the data
        const response = await participateAuction(participantName, place, phoneNo, agreement);

        // Send a success response
        res.json({ message: 'Successfully joined auction', data: response });
    } catch (error) {
        res.status(500).json({ message: 'Error joining auction', error });
    }
});

module.exports = router;
