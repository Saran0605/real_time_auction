const { shouldPlaceBid } = require('./geminiService');

async function testBidDecision() {
    const productName = "iPhone 14 Pro";
    const price = 172000;
    const description = "Brand new, sealed box, 128GB with warranty.";

    try {
        const decision = await shouldPlaceBid(productName, price, description);
        console.log("Gemini Response:\n", decision);
    } catch (error) {
        console.error("Test Failed:", error.message);
    }
}

testBidDecision();
