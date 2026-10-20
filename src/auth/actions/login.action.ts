import { tesloAPi } from "../../api/tesloApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const loginAction = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  try {
    const { data } = await tesloAPi.post<AuthResponse>("/auth/login", {
      email,
      password,
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
