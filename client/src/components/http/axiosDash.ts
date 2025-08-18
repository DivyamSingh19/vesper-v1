import axios from "axios";

export const dash = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/v1/appointment",
  headers: { "Content-Type": "application/json" },
});
