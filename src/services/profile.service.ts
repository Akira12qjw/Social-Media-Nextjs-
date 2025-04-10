import { ENDPOINTS } from "@/constants/config";
import { AccountType } from "@/schemaValidations/account.schema";

const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

const createApiClient = () => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error("No access token found");
  }

  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

const handleApiResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }
  return data;
};

interface ValidationError {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

interface ValidationErrors {
  [key: string]: ValidationError;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: ValidationErrors;
}

export const getProfile = async (
  username?: string
): Promise<{
  success: boolean;
  data?: AccountType;
  message?: string;
}> => {
  try {
    const apiClient = createApiClient();
    const endpoint = username
      ? `${ENDPOINTS.USERS.ME}/${username}`
      : `${ENDPOINTS.USERS.ME}`;

    const response = await fetch(endpoint, {
      headers: apiClient.headers,
    });

    const data = await handleApiResponse(response);

    // console.log("getProfile", JSON.stringify(data.result));
    localStorage.setItem("profile", JSON.stringify(data.result));
    return {
      success: true,
      data: data.result,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch profile",
    };
  }
};

export const updateProfile = async (
  profileData: AccountType
): Promise<ApiResponse<AccountType>> => {
  try {
    const apiClient = createApiClient();
    const response = await fetch(`${ENDPOINTS.USERS.ME}`, {
      method: "PATCH",
      headers: apiClient.headers,
      body: JSON.stringify(profileData),
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "API request failed",
        errors: data.errors,
      };
    }

    return {
      success: true,
      data: data.result,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update profile",
    };
  }
};

export const getProfileUser = async (
  username?: string
): Promise<{
  success: boolean;
  data?: AccountType;
  message?: string;
}> => {
  try {
    const apiClient = createApiClient();
    const endpoint = `${ENDPOINTS.USERS.GET_USER}/${username}`;

    const response = await fetch(endpoint, { headers: apiClient.headers });
    const data = await handleApiResponse(response);

    return {
      success: true,
      data: data.result,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch profile user",
    };
  }
};

export const followUser = async (
  userId: string
): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    const apiClient = createApiClient();
    const response = await fetch(ENDPOINTS.USERS.FOLLOW, {
      method: "POST",
      headers: {
        ...apiClient.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        followed_user_id: userId,
      }),
    });

    await handleApiResponse(response);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to follow user",
    };
  }
};

export const unfollowUser = async (
  userId: string
): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    const apiClient = createApiClient();
    const response = await fetch(`${ENDPOINTS.USERS.FOLLOW}/${userId}`, {
      method: "DELETE",
      headers: apiClient.headers,
    });

    await handleApiResponse(response);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to unfollow user",
    };
  }
};

export const getFollowing = async (): Promise<{
  success: boolean;
  data?: AccountType[];
  message?: string;
}> => {
  try {
    const apiClient = createApiClient();
    const response = await fetch(ENDPOINTS.USERS.GET_FOLLOWING, {
      headers: apiClient.headers,
    });

    const data = await handleApiResponse(response);

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
          : "Failed to fetch following users",
    };
  }
};
