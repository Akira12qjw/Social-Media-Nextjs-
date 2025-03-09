import { AccountType } from "@/schemaValidations/account.schema";
import { ENDPOINTS } from "@/constants/config";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export async function getProfile(): Promise<ApiResponse<AccountType>> {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return {
      success: false,
      message: "No access token found",
      data: {} as AccountType,
    };
  }

  try {
    const response = await fetch(ENDPOINTS.USERS.ME, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch profile");
    }

    return {
      success: true,
      data: data.result,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while fetching profile",
      data: {} as AccountType,
    };
  }
}

export async function updateProfile(
  profileData: Partial<AccountType>
): Promise<ApiResponse<AccountType>> {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return {
      success: false,
      message: "No access token found",
      data: {} as AccountType,
    };
  }

  try {
    const response = await fetch(ENDPOINTS.USERS.ME, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update profile");
    }

    return {
      success: true,
      data: data.result,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while updating profile",
      data: {} as AccountType,
    };
  }
}
