export const summarizePrompt = ({
  extractedText,
  numPages,
  title,
  author,
  keywords,
}: {
  extractedText: string;
  numPages: number;
  title?: string;
  author?: string;
  keywords?: string;
}) => {
  const cleanedText = extractedText
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/–|—/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 14000);

  return `You are an AI assistant with expertise in the legal domain. Summarize the following PDF content clearly and concisely.

DOCUMENT INFO:
- Pages: ${numPages}
- Title: ${title?.trim() || "Untitled"}
- Author: ${author?.trim() || "Unknown"}
- Keywords: ${keywords?.trim() || "N/A"}

Your response must be:
- In plain text only (no markdown, no symbols like *, #, etc.)
- Bullet points should be written inline, not separated by line breaks
- Do not use paragraph breaks — summarize as a single block of plain text
- Use semicolons or dashes to separate bullet points if needed

CONTENT:
${cleanedText}`;
};
