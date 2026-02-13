import { GoogleGenAI } from "@google/genai";
import { FlightSearchParams } from '../types';

export const generateDealContext = async (searchParams: FlightSearchParams): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      console.warn("API Key not found, returning fallback text.");
      return `We have identified 3 unsold ${searchParams.cabinClass.toLowerCase()} class seats for your trip to ${searchParams.to}. These rates are time-sensitive.`;
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const totalPax = searchParams.passengers.adults + searchParams.passengers.children;

    // We ask Gemini to act as a flight pricing analyst
    const prompt = `
      You are a flight pricing analyst. A user is looking for ${searchParams.cabinClass} class flights from ${searchParams.from} to ${searchParams.to} for ${totalPax} passengers.
      Generate a short, urgent, and professional single sentence explaining why "unpublished" or "consolidator" rates might be 40-60% cheaper for this specific route and class right now.
      Mention things like "inventory clearing", "business class undersell", or "exclusive route agreements".
      Do not mention specific prices. Keep it under 30 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || `High availability detected for ${searchParams.cabinClass} seats to ${searchParams.to}. Specialized fares unlocked.`;
  } catch (error) {
    console.error("Gemini generation error:", error);
    return `We have identified high-value unsold inventory for ${searchParams.cabinClass} flights to ${searchParams.to}.`;
  }
};