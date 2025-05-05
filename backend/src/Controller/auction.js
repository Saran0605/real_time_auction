

const Auction = require('../Models/auction'); // ✅ assign to a variable

async function createAuction(auctionName,
    auctionTiming,
    entryAmount,
    startDate,
    time,
    participants,
    productList) {

    const newAuction = await Auction.create({
        name: auctionName,
        timing: auctionTiming,
        entryAmount,
        startDate,
        time,
        participants,
        productList
    });
  return {
    name: auctionName,
        timing: auctionTiming,
        entryAmount,
        startDate,
        time,
        participants,
        productList
  };
}

async function getAllAuctions() {
    try {
        const auctions = await Auction.find({});
        return auctions;
    } catch (error) {
        console.error("Error fetching auctions:", error);
        throw new Error('Failed to fetch auctions');
    }
}


async function goAuction(secretToken) {

    const newAuction = await Auction.create({
        secretToken
    });
  return {
    secretToken
  };
}

module.exports = {
    createAuction,
    getAllAuctions,
    goAuction
};