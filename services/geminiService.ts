
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export class OsoAI {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY });
  }

  async getManagerAdvice(context: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Eres 'OsoAI', el asistente inteligente de 'Las Hamburguesas del Oso'. 
        Tu objetivo es ayudar al gerente o cliente con recomendaciones. 
        Contexto actual: ${context}`,
        config: {
          thinkingConfig: { thinkingBudget: 0 }
        }
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Lo siento, mi conexión con el bosque está fallando. Intenta de nuevo.";
    }
  }

  async analyzeOrder(orderItems: any[]) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analiza este pedido de hamburguesas y sugiere un postre o bebida que combine perfectamente.
        Pedido: ${JSON.stringify(orderItems)}`,
        config: {
           responseMimeType: "application/json",
           responseSchema: {
             type: Type.OBJECT,
             properties: {
               suggestion: { type: Type.STRING },
               reasoning: { type: Type.STRING }
             },
             required: ["suggestion", "reasoning"]
           }
        }
      });
      return JSON.parse(response.text);
    } catch (error) {
      return { suggestion: "Malteada de Vainilla", reasoning: "Siempre es una buena opción clásica." };
    }
  }
}

export const osoAi = new OsoAI();
