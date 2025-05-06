const joinAuction = require('../models/joinauction');

async function participateAuction(secretToken, participantName, place, phoneNo, agreement, auctionName, auctionId) {
    const newJoin = await joinAuction.create({
        secretToken,
        participantName,
        place,
        phoneNo,
        agreement,
        auctionName,
        auctionId
    });

    return newJoin;
}

async function getJoinedAuctions() {
    try {
        const auctions = await joinAuction.find({});
        console.log("Fetched joined auctions:", auctions);
        return auctions;
    } catch (error) {
        console.error("Error fetching joined auctions:", error);
        throw new Error('Failed to fetch joined auctions');
    }
}


module.exports = {
    participateAuction,
    getJoinedAuctions
};
