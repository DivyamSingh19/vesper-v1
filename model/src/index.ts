import { Hono } from "hono";
import summarizer from "./routes/summarizer";
import type { Env } from "./types/api";
import { cors } from 'hono/cors'

const app = new Hono<{ Bindings: Env }>();
app.use("*", cors());
app.get("/", (c) => {
  return c.text("API working! byeee");
});

app.route("/api/v1", summarizer);

export default app;
