import fs from "fs/promises";
import PdfParse from "pdf-parse";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();

const filepath = "nda.pdf"

async function summarizePDF() {
  try {
    const pdfBuffer = await fs.readFile(filepath);
    const data = await PdfParse(pdfBuffer);

    const maxChars = 30000;
    const extractedText = data.text.slice(0, maxChars);

    if (data.text.length > maxChars) {
      console.log(`Text truncated to ${maxChars} characters for API`);
    }

    console.log("Generating summary");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Please provide a comprehensive summary of this PDF content:

DOCUMENT INFO:
- Pages: ${data.numpages}
- Title: ${data.info?.Title || "Untitled"}

Please structure your response with:
1. **Main Topic**: What is this document about?
2. **Key Points**: The most important information (bullet points)
3. **Summary**: Overall takeaways

CONTENT:
${extractedText}`;

    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    console.log(summary);
  
    const outputFile = filepath+" summary.txt";
    await fs.writeFile(
      outputFile,
      `PDF Summary (${data.numpages} pages)\n${"=".repeat(40)}\n\n${summary}`
    );
    console.log(`\nSummary saved to: ${outputFile}`);

    return summary;
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
}

summarizePDF()
  .then(() => console.log("\nComplete!"))
  .catch(() => process.exit(1));
