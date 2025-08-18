import axiosAuth from "@/components/http/axiosAuth";

 
const persistAuth = (data: any) => {
  localStorage.setItem("auth", JSON.stringify(data));
};

 
export const registerAdv = async (payload: any) => {
  try {
    const res = await axiosAuth.post("/register-adv", payload);
    if (res.data.success) {
      persistAuth({
        token: res.data.token,
        email: res.data.email,
        id: res.data.id,
        stateRollNumber: res.data.stateRollNumber,
        role: "lawyer",
      });
    }
    return res.data;
  } catch (error: any) {
    console.error("Lawyer registration failed:");
    throw error;
  }
};

 
export const loginAdv = async (payload: any) => {
  const res = await axiosAuth.post("/login-adv", payload);
  if (res.data.success) {
    persistAuth({
      token: res.data.token,
      email: res.data.email,
      id: res.data.id,
      stateRollNumber: res.data.stateRollNumber,
      role: "lawyer",
    });
  }
  return res.data;
};

 
export const registerUser = async (payload: any) => {
  const res = await axiosAuth.post("/register-user", payload);
  if (res.data.success) {
    persistAuth({
      token: res.data.token,
      email: res.data.email,
      id: res.data.id,
      role: "user",
    });
  }
  return res.data;
};

 
export const loginUser = async (payload: any) => {
  const res = await axiosAuth.post("/login-user", payload);
  if (res.data.success) {
    persistAuth({
      token: res.data.token,
      email: res.data.email,
      id: res.data.id,
      role: "user",
    });
  }
  return res.data;
};
