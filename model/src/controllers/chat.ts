import { Context } from "hono";
import { chatPrompt } from "../utils/prompt";
import { getGeminiResponse } from "../utils/gemini";

export const chat = async (c: Context) => {
  try {
    const body = await c.req.json<{ text?: string }>();
    const { text } = body;

    if (!text) {
      return c.json({
        error: "Text is required to further solve the queries",
      });
    }

    const prompt = chatPrompt({ text });

    const response = await getGeminiResponse(prompt, c.env.GEMINI_API_KEY);

    return c.json({
      success: true,
      response,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: "Failed to resolve the query",
      },
      500
    );
  }
};
