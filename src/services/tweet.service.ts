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

export async function createTweet(
  content: string,
  medias?: File[]
): Promise<ApiResponse<TweetType>> {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return {
      success: false,
      message: "No access token found",
      data: {} as TweetType,
    };
  }

  try {
    const formData = new FormData();
    formData.append("content", content);

    if (medias) {
      medias.forEach((media) => {
        formData.append("medias", media);
      });
    }

    const response = await fetch(ENDPOINTS.TWEETS, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create tweet");
    }

    return {
      success: true,
      data: data.tweet,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while creating tweet",
      data: {} as TweetType,
    };
  }
}

export async function deleteTweet(tweetId: string): Promise<ApiResponse<void>> {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return {
      success: false,
      message: "No access token found",
      data: undefined,
    };
  }

  try {
    const response = await fetch(`${ENDPOINTS.TWEETS}/${tweetId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete tweet");
    }

    return {
      success: true,
      data: undefined,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while deleting tweet",
      data: undefined,
    };
  }
}

export async function likeTweet(tweetId: string): Promise<ApiResponse<void>> {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return {
      success: false,
      message: "No access token found",
      data: undefined,
    };
  }

  try {
    const response = await fetch(`${ENDPOINTS.TWEETS}/${tweetId}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to like tweet");
    }

    return {
      success: true,
      data: undefined,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while liking tweet",
      data: undefined,
    };
  }
}

export async function retweet(tweetId: string): Promise<ApiResponse<void>> {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return {
      success: false,
      message: "No access token found",
      data: undefined,
    };
  }

  try {
    const response = await fetch(`${ENDPOINTS.TWEETS}/${tweetId}/retweet`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to retweet");
    }

    return {
      success: true,
      data: undefined,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while retweeting",
      data: undefined,
    };
  }
}
