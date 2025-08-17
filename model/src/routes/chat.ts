import { Hono } from "hono";
import { chat } from "../controllers/chat";

const chatter = new Hono();

chatter.post("/chat", chat);

export default chatter;
