"use client";

import { tweetListSchema } from "@/schemaValidations/tweet.schema";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getTweet = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${baseUrl}/tweets?limit=20&page=1`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();

  // Parse API response using Zod.
  const parsedData = tweetListSchema.parse(data);

  return {
    message: parsedData.message,
    tweets: parsedData.result.tweets, // Danh sách tweets.
    meta: {
      limit: parsedData.result.limit,
      page: parsedData.result.page,
      total_page: parsedData.result.total_page,
    },
  };
};
