import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ideaxai.vercel.app",
      process.env.FRONTEND_URL, // add this for flexibility
    ],
    methods: ["GET", "POST"],
    credentials: true,
  }),
);
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/api/generate-blueprint", async (req, res) => {
  try {
    const { idea } = req.body;

    if (!idea || typeof idea !== "string" || idea.trim().length < 10) {
      return res.status(400).json({
        error:
          "Please provide a more detailed startup idea (minimum 10 characters).",
      });
    }

    const prompt = `
You are a world-class startup advisor, product strategist, and YC-style investor mentor.

Your task is to transform a raw startup idea into a **structured, investor-ready startup blueprint**.

STARTUP IDEA:
"${idea}"

Analyze this idea deeply and produce a **high-quality startup blueprint**.

Think like:
• Y Combinator partner
• Startup founder
• Product manager
• Venture capitalist

Your output must help a founder understand:
- what to build
- who to build it for
- how to monetize it
- how to launch it successfully

--------------------------------

RETURN STRICTLY VALID JSON.

DO NOT include explanations outside JSON.

All values must be **plain text strings**.

Use bullet formatting inside strings using:
• bullet points
\\n for line breaks.

--------------------------------

Required JSON format:

{
"startupOverview": "",
"problemStatement": "",
"targetAudience": "",
"mvpFeatures": "",
"techStack": "",
"revenueModel": "",
"marketingStrategy": "",
"competitorAnalysis": "",
"uniqueValueProposition": "",
"validationStrategy": "",
"developmentRoadmap": ""
}

--------------------------------

Content requirements:

startupOverview  
Explain the concept clearly and its potential market opportunity.

problemStatement  
Describe the pain points users face and why existing solutions are inadequate.

targetAudience  
Define the primary users and early adopters.

mvpFeatures  
List the **5–8 most important MVP features** using bullet points.

techStack  
Recommend a **modern scalable stack** suitable for a startup.

Example format:
Frontend: React / Next.js  
Backend: Node.js / Python  
Database: PostgreSQL  
AI: Gemini / OpenAI  
Hosting: Vercel / AWS

revenueModel  
Explain monetization strategies and pricing ideas.

marketingStrategy  
Explain how the startup should acquire its first 10,000 users.

competitorAnalysis  
Mention **3–5 competitors** and explain differentiation.

uniqueValueProposition  
Explain why customers would choose this product over alternatives.

validationStrategy  
Provide a step-by-step plan to test the idea before full development.

developmentRoadmap  
Explain development phases:
• MVP
• Beta Launch
• Public Launch
• Scaling

--------------------------------

Important Rules:
- Every value MUST be a string
- No arrays
- No nested objects
- Use bullet formatting within strings
- Make responses practical and actionable
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;

    if (!text) {
      return res.status(500).json({
        error: "AI generation failed. Please try again.",
      });
    }

    const blueprint = JSON.parse(text);

    res.json({ blueprint });
  } catch (error) {
    console.error("Blueprint generation error:", error);

    if (error instanceof SyntaxError) {
      return res.status(500).json({
        error: "AI response parsing failed.",
      });
    }

    res.status(500).json({
      error: "Failed to generate blueprint. Check API key or prompt.",
    });
  }
});

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 IDEAxAI server running on port ${PORT}`);
  });
}

export default app;

