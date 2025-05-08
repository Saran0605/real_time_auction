import express from 'express';
import { shouldPlaceBid } from '../services/geminiServices.js';

const router = express.Router();

router.post('/suggest', async (req, res) => {
    const { name, betValue, description } = req.body;
    try {
        const suggestion = await shouldPlaceBid(name, betValue, description);
        res.json({ suggestion });
    } catch (error) {
        console.error('Gemini API error:', error);
        res.status(500).json({ error: 'Failed to get suggestion from Gemini API' });
    }
});

export default router;