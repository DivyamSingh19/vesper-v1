import { Hono } from "hono";
import summarizer from "./routes/summarizer";

interface Env {
  GEMINI_API_KEY: string;
}

const app = new Hono<{ Bindings: Env }>();

app.get("/", (c) => {
  const secret = c.env.GEMINI_API_KEY;
  return c.text(`Secret is: ${secret}`);
  // return c.text("API working! byeee");
});

app.route("/summarize", summarizer);

export default app;
