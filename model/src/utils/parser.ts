import { getDocument } from "pdfjs-serverless";
import { parsedResult, pdfInfo } from "../types/metadata";

export async function parsePdf(buffer: ArrayBuffer) {
  const loadingPdf = getDocument({ data: buffer });
  const pdf = await loadingPdf.promise;
  const meta = await pdf.getMetadata();

  const info = meta.info as pdfInfo;
  const metadata = meta.metadata as unknown as Record<string, string>;

  const title = info.Title || metadata?.["dc:title"] || "Untitled";
  const author = info.Author || metadata?.["dc:creator"] || "Unknown";
  const subject =
    info.Subject || metadata?.["dc:description"] || "Not specified";
  const keywords = info.Keywords || metadata?.["pdf:Keywords"] || "None";

  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    fullText += content.items.map((item: any) => item.str).join(" ") + "\n";
  }

  return {
    text: fullText,
    title,
    author,
    subject,
    keywords,
    numPages: pdf.numPages,
  };
}
