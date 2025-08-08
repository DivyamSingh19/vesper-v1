import { Hono } from "hono";
import summarizer from "./routes/summarizer";
import type { Env } from "./types/api";

const app = new Hono<{ Bindings: Env }>();

app.get("/", (c) => {
  return c.text("API working! byeee");
});

app.route("/summarize", summarizer);

export default app;
