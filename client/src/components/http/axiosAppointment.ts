import axios from "axios";

const axiosAppointment = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api/v1/appointments",
  headers: { "Content-Type": "application/json" },
});



export default axiosAppointment;
