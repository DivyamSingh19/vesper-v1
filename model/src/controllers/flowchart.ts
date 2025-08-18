import { Context } from "hono";
import { mermaidPrompt } from "../utils/prompt";
import { getGeminiResponse } from "../utils/gemini";

export const flowchart = async (c: Context) => {
  try {
    const { summary } = await c.req.json();

    const prompt = mermaidPrompt(summary);

    const response = await getGeminiResponse(prompt, c.env.GEMINI_API_KEY);

    return c.json({
      success: true,
      response,
    });
  } catch (error) {
    console.error("Generation of mermaid syntax failed: ", error);
    return c.json({
      success: false,
    });
  }
};
