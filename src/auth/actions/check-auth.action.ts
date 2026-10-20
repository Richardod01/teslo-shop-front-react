import { tesloAPi } from "../../api/tesloApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const checkAuthAction = async (): Promise<AuthResponse> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  try {
    const { data } = await tesloAPi.get<AuthResponse>("/auth/check-status");
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    console.log(error);
    localStorage.removeItem("token");
    // eslint-disable-next-line preserve-caught-error
    throw new Error("Token expired or no valid");
  }
};
