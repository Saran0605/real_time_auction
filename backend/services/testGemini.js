import { shouldPlaceBid } from './geminiService.js';

const testGemini = async () => {
    try {
        console.log("Testing Gemini API with a sample auction...");
        const response = await shouldPlaceBid(
            "Platinum necklase with diamond pendant",
            4500,
            "made up of pure materials and diamond and only 7 exists in the world",
        );
        console.log("Gemini Response:", response);
    } catch (error) {
        console.error("Test failed:", error.message);
        process.exit(1);
    }
};

testGemini();
