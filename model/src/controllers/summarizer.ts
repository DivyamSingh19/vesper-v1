import { parsePdf } from "../utils/parser";
import { getGeminiResponse } from "../utils/gemini";
import { summarizePrompt } from "../utils/prompt";
import type { parsedResult } from "../types/metadata";

export const summarizePdf = async (c: any) => {
  const body = await c.req.parseBody();
  const file = body["file"];

  if (!file || !(file instanceof File)) {
    return c.json({ error: "No file uploaded" }, 400);
  }

  const buffer = await file.arrayBuffer();
  const parsedResult: parsedResult = await parsePdf(buffer);

  const {
    text: extractedText,
    numPages,
    title,
    author,
    keywords,
  } = parsedResult;

  const prompt = summarizePrompt({
    extractedText,
    numPages,
    title,
    author,
    keywords,
  });

  const summary = await getGeminiResponse(prompt, c.env.GEMINI_API_KEY);

  return c.json({
    title: title || "Untitled",
    numPages,
    summary,
  });
};
