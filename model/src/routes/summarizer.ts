import { Hono } from "hono";
import { summarizePdf } from "../controllers/summarizer";

const summarizer = new Hono();

summarizer.post("/", summarizePdf);

export default summarizer;
