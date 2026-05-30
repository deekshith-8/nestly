import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, title, keywords, tone } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return a professional-looking offline generator response if key not found
      // This is a robust fallback to ensure the app is fully functional and explains gracefully
      return NextResponse.json({
        text: `🚀 [Demo Generation Mode - Add GEMINI_API_KEY for custom AI responses]\n\nHello, I'm ${name || "a designer/developer"}! As a ${title || "Creative Professional"}, I specialize in bringing robust ideas to life. With key focus areas in ${keywords || "modern design and development"}, I am dedicated to crafting highly performant, scalable, and beautifully interactive digital experiences. Let's build something exceptional together!`,
        isOfflineDemo: true
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const prompt = `Write a compelling, professional, and elegant website welcome bio/intro statement.
User's details:
- Name: ${name}
- Job Title / Role: ${title}
- Focus Keywords / Technologies: ${keywords}
- Tone requested: ${tone || "professional"}

Rules:
1. Write in the 1st person (e.g. "I'm ${name}...", "I specialize in...").
2. Keep it concise, engaging, and suitable for a professional portfolio website (about 3-4 sentences, max 80 words).
3. Do not include markdown formatting like asterisks or quotes around the bio itself. Just output the clean text.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini bio generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate bio. " + error.message },
      { status: 500 }
    );
  }
}
