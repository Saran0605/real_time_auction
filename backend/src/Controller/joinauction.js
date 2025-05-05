const joinAuction = require('../Models/joinauction'); // ✅ assign to a variable

async function participateAuction(participantName, place, phoneNo, agreement) {
    const newJoin = await joinAuction.create({
        participantName,
        place,
        phoneNo,
        agreement, // Store the agreement value (Yes/No)
    });

    return {
        participantName,
        place,
        phoneNo,
        agreement,
    };
}

module.exports = {
    participateAuction,
};
