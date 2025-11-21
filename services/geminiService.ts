import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

/**
 * Generates creative marketing taglines based on a business description.
 * Uses Gemini 2.5 Flash for speed and creativity.
 */
export const generateTaglines = async (businessDescription: string): Promise<string[]> => {
  try {
    // Use the environment variable for the API key
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API Key not found. Returning mock data for demo purposes.");
      return [
        "Innovation meets Imagination.",
        "Designing the future, today.",
        "Your vision, our craft."
      ];
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Generate 3 short, punchy, and modern marketing taglines for a business with this description: "${businessDescription}".`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a world-class creative copywriter. You output JSON only.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            taglines: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of 3 creative taglines"
            }
          },
          required: ["taglines"]
        }
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No response text received from Gemini.");
    }

    const data = JSON.parse(responseText);
    return data.taglines || [];

  } catch (error) {
    console.error("Error generating taglines:", error);
    // Fallback in case of API error to keep UI functional
    return [
      "Error generating specific taglines.",
      "Please check your API connection.",
      "Try again in a moment."
    ];
  }
};