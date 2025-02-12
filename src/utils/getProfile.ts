import { AccountType, profileRes } from "@/schemaValidations/account.schema";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const getProfile = async (): Promise<AccountType> => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("No access token found");
  }

  try {
    const response = await fetch(`${baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const parsedData = profileRes.parse(data);

    return parsedData.result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch profile: ${error.message}`);
    }
    throw new Error("Failed to fetch profile");
  }
};
