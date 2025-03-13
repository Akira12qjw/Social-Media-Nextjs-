import { TweetType } from "@/schemaValidations/tweet.schema";
import { ENDPOINTS } from "@/constants/config";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

const ITEMS_PER_PAGE = 10;

export async function getTweets(
  page: number = 1
): Promise<ApiResponse<TweetType[]>> {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return {
      success: false,
      message: "No access token found",
      data: [],
    };
  }

  try {
    const response = await fetch(
      `${ENDPOINTS.TWEETS}?limit=${ITEMS_PER_PAGE}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch tweets");
    }

    return {
      success: true,
      data: data.result.tweets,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while fetching tweets",
      data: [],
    };
  }
}
