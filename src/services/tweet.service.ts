import { TweetType } from "@/schemaValidations/tweet.schema";
import { ENDPOINTS } from "@/constants/config";
import { TabType } from "@/app/(pages)/home/_components/mainContent";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

const ITEMS_PER_PAGE = 10;

export async function getTweets(
  page: number = 1,
  tab: TabType = "for-you"
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
    const timestamp = Date.now();
    const queryParams = new URLSearchParams({
      limit: ITEMS_PER_PAGE.toString(),
      page: page.toString(),
      _: timestamp.toString(),
      type: tab === "following" ? "following" : "all",
    });

    const response = await fetch(
      `${ENDPOINTS.TWEETS}?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
        next: { revalidate: 0 },
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

export async function likeTweet(
  tweetId: string,
  isLiked: boolean
): Promise<ApiResponse<void>> {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return {
      success: false,
      message: "No access token found",
      data: undefined,
    };
  }

  try {
    const response = await fetch(
      isLiked ? `${ENDPOINTS.LIKE}/tweets/${tweetId}` : ENDPOINTS.LIKE,
      {
        method: isLiked ? "DELETE" : "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: !isLiked ? JSON.stringify({ tweet_id: tweetId }) : undefined,
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `Failed to ${isLiked ? "unlike" : "like"} tweet`
      );
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
          : `An error occurred while ${isLiked ? "unliking" : "liking"} tweet`,
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
