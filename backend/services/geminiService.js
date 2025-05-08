// backend/services/geminiServices.js
import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function shouldPlaceBid(productName, price, description) {
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });
    const prompt = `
        Analyze this auction item and give advice:
        Product: ${productName}
        Current Bid: ₹${price}
        Description: ${description}
        
        Provide a detailed analysis of whether I should bid on this item considering:
        1. Current market value
        2. Item condition
        3. Price point assessment
        4. Investment potential
        
        Give a clear Yes/No recommendation with brief reasoning.
    `;
    
    const result = await model.generateContent(prompt);
    return await result.response.text();
}