// Load environment variables
import dotenv from "dotenv";
import express from'express';
import { GoogleGenAI } from "@google/genai";

// Initialize Express
const app = express();
app.use(express.json());
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Create a route for text generation
app.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Call Gemini model
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    

    // Send back AI-generated output
    res.json({ output: result.text });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start the server locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Gemini API running on http://localhost:${PORT}`);
});

