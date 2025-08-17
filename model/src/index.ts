import { Hono } from "hono";
import type { Env } from "./types/api";
import { cors } from "hono/cors";
import summarizer from "./routes/summarizer";
import chatter from "./routes/chat";

const app = new Hono<{ Bindings: Env }>();
app.use("*", cors());

app.get("/", (c) => {
  return c.text("API working! byeee");
});

app.route("/api/v1", summarizer);
app.route("/api/v1", chatter);

export default app;
