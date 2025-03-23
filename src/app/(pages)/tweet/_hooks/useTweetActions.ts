import { useState, useCallback } from "react";
import { TweetType } from "@/schemaValidations/tweet.schema";
import { likeTweet } from "@/services/tweet.service";
import { toast } from "sonner";

export const useTweetActions = () => {
  const [likedTweets, setLikedTweets] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const [loadingLikes, setLoadingLikes] = useState<Record<string, boolean>>({});

  const handleLike = useCallback(
    async (tweetId: string) => {
      if (loadingLikes[tweetId]) return;

      const isCurrentlyLiked = likedTweets[tweetId];
      setLoadingLikes((prev) => ({ ...prev, [tweetId]: true }));

      try {
        // Optimistic update
        setLikedTweets((prev) => ({ ...prev, [tweetId]: !isCurrentlyLiked }));
        setLikeCounts((prev) => ({
          ...prev,
          [tweetId]: prev[tweetId] + (isCurrentlyLiked ? -1 : 1),
        }));

        const response = await likeTweet(tweetId, isCurrentlyLiked);

        if (!response.success) {
          // Revert changes if request fails
          setLikedTweets((prev) => ({ ...prev, [tweetId]: isCurrentlyLiked }));
          setLikeCounts((prev) => ({
            ...prev,
            [tweetId]: prev[tweetId] + (isCurrentlyLiked ? 1 : -1),
          }));
          toast.error(response.message || "Không thể thực hiện thao tác");
        }
      } catch {
        // Revert changes if request fails
        setLikedTweets((prev) => ({ ...prev, [tweetId]: isCurrentlyLiked }));
        setLikeCounts((prev) => ({
          ...prev,
          [tweetId]: prev[tweetId] + (isCurrentlyLiked ? 1 : -1),
        }));
        toast.error("Đã xảy ra lỗi khi thực hiện thao tác");
      } finally {
        setLoadingLikes((prev) => ({ ...prev, [tweetId]: false }));
      }
    },
    [likedTweets, loadingLikes]
  );

  const initializeTweetStates = useCallback((tweets: TweetType[]) => {
    const initialLikeCounts = tweets.reduce((acc, tweet) => {
      acc[tweet._id] = tweet.likes || 0;
      return acc;
    }, {} as Record<string, number>);

    const initialLikedStates = tweets.reduce((acc, tweet) => {
      acc[tweet._id] = tweet.is_liked || false;
      return acc;
    }, {} as Record<string, boolean>);

    setLikeCounts(initialLikeCounts);
    setLikedTweets(initialLikedStates);
  }, []);

  return {
    likedTweets,
    likeCounts,
    loadingLikes,
    handleLike,
    initializeTweetStates,
  };
};
