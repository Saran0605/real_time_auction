

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

module.exports = {
    createAuction
};