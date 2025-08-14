import { Hono } from "hono";
import { summarizePdf } from "../controllers/summarizer";

const summarizer = new Hono();

summarizer.post("/summarize-pdf", summarizePdf);

export default summarizer;
