import { GoogleGenAI } from "@google/genai";

export const generateDestinationDescription = async (locationName: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("No API Key found for Gemini");
      return "Description generation unavailable (Missing API Key).";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Using flash for speed on a simple text task
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a captivating, luxurious, 2-sentence travel description for ${locationName}. Focus on the atmosphere and unique experience.`,
    });

    return response.text || "Could not generate description.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI service.";
  }
};