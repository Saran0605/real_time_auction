import joinAuction from '../models/joinauction.js';

export async function participateAuction(secretToken, participantName, place, phoneNo, agreement, auctionName, auctionId, auctionDescription) {
    const newJoin = await joinAuction.create({
        secretToken,
        participantName,
        place,
        phoneNo,
        agreement,
        auctionName,
        auctionId,
        auctionDescription
    });

    return newJoin;
}

export async function getJoinedAuctions(email) {
    try {
        // If email is provided, filter by email (or participantName, etc. as needed)
        const filter = email ? { participantName: email } : {};
        const auctions = await joinAuction.find(filter);
        console.log("Fetched joined auctions:", auctions);
        return auctions;
    } catch (error) {
        console.error("Error fetching joined auctions:", error);
        throw new Error('Failed to fetch joined auctions');
    }
}
