import { ENDPOINTS } from "@/constants/config";
import { LoginFormData, RegisterFormData } from "../_hooks/useAuthForm";

interface AuthResponse<T = unknown> {
  success: boolean;
  message?: string;
  errors?: Record<string, { msg: string }>;
  data?: T;
}

async function handleResponse<T>(response: Response): Promise<AuthResponse<T>> {
  const data = await response.json();

  if (!response.ok) {
    if (data.errors?.email?.msg) {
      throw new Error(data.errors.email.msg);
    } else if (data.message) {
      throw new Error(data.message);
    } else {
      throw new Error("Yêu cầu thất bại");
    }
  }

  return data;
}

export async function registerUser(
  userData: RegisterFormData
): Promise<AuthResponse> {
  const response = await fetch(`${ENDPOINTS.USERS.REGISTER}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  });

  return handleResponse(response);
}

export async function loginUser(
  credentials: LoginFormData
): Promise<AuthResponse> {
  const response = await fetch(`${ENDPOINTS.USERS.LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return handleResponse(response);
}

export async function logoutUser(): Promise<AuthResponse> {
  const response = await fetch(`${ENDPOINTS.USERS.LOGOUT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return handleResponse(response);
}
