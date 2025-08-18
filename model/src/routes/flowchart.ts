import { Hono } from "hono";
import { flowchart } from "../controllers/flowchart"

const flowy = new Hono()

flowy.post("/flowchart",flowchart)

export default flowy