import axios from "axios";

const axiosAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/v1/auth",
  headers: { "Content-Type": "application/json" },
});

export default axiosAuth;
