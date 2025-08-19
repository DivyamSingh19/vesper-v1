import { dash } from "@/components/functions/http/axiosDash";

export const postAppointmentAsync = async (payload: any) => {
  try {
    const response = await dash.post("/add-appointment", payload);
    return response.data;
  } catch (error) {
    console.error("Error posting appointment:", error);
    throw error;
  }
};
