require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function shouldPlaceBid(productName, price, description) {
    try {
        // Note the correct model format
        const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });

        const prompt = `
        Product: ${productName}
        Current Bid Price: ₹${price}
        Description: ${description}

        Should I place a bid on this item at this price? Reply yes or no with a reason.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response.text();
        return response;
    } catch (error) {
        console.error("Error from Gemini API:", error);
        throw error;
    }
}

module.exports = { shouldPlaceBid };
