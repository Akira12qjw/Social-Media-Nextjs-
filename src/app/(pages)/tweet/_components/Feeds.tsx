"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TweetType } from "@/schemaValidations/tweet.schema";
import SelectedTweet from "./selectedTweet";
import MediaGrid from "./renderMediaGrid";
import { likeTweet } from "@/services/tweet.service";
import { toast } from "sonner";
import { formatTimeFromNow } from "@/utils/formatTimeFromNow";
import { motion } from "framer-motion";
interface FeedsProps {
  tweetData: TweetType[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export default function Feeds({
  tweetData,
  loading,
  hasMore,
  onLoadMore,
}: FeedsProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const [selectedTweet, setSelectedTweet] = useState<TweetType | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [likedTweets, setLikedTweets] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});
  const [loadingLikes, setLoadingLikes] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    // Initialize like counts and states from tweet data
    const initialLikeCounts = tweetData.reduce((acc, tweet) => {
      acc[tweet._id] = tweet.likes || 0;
      return acc;
    }, {} as { [key: string]: number });

    const initialLikedStates = tweetData.reduce((acc, tweet) => {
      // Assuming the API returns an 'is_liked' field in the tweet object
      acc[tweet._id] = tweet.is_liked || false;
      return acc;
    }, {} as { [key: string]: boolean });

    setLikeCounts(initialLikeCounts);
    setLikedTweets(initialLikedStates);
  }, [tweetData]);

  const handleLike = async (tweetId: string) => {
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
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasMore && !loading) {
        onLoadMore();
      }
    }, options);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loading, onLoadMore]);

  useEffect(() => {
    const currentLoadingRef = loadingRef.current;
    const currentObserver = observerRef.current;

    if (currentLoadingRef && currentObserver) {
      currentObserver.observe(currentLoadingRef);
    }

    return () => {
      if (currentLoadingRef && currentObserver) {
        currentObserver.unobserve(currentLoadingRef);
      }
    };
  }, [tweetData]);
  const handleImageClick = (tweet: TweetType, index: number) => {
    setSelectedTweet(tweet);
    setCurrentImageIndex(index);
  };
  const handleCloseModal = () => {
    setSelectedTweet(null);
    setCurrentImageIndex(0);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedTweet && currentImageIndex < selectedTweet.medias.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedTweet && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };
  return (
    <div>
      {tweetData.map((tweet, index) => (
        <div
          key={`${tweet._id}-${index}`}
          className="p-4 border-b border-gray-200 w-[650px]"
        >
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <Image
                src={
                  tweet.user.avatar ||
                  "https://res.cloudinary.com/dwyvtyasp/image/upload/v1734597632/xgkaepsmtzdf25tqtzsi.png"
                }
                alt="avatar"
                className="w-14 h-14 rounded-full min-w-14"
                width={50}
                height={50}
                priority={true}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <span className="font-bold hover:underline cursor-pointer">
                    {tweet.user?.username}
                  </span>
                  <span className="text-gray-500">
                    @{tweet.user?.email?.split("@")[0]}
                  </span>
                  <span className="text-gray-500 ">
                    · {formatTimeFromNow(tweet.created_at)}
                  </span>
                </div>
              </div>
              <p className="text-gray-900 mt-1">{tweet.content}</p>
              <div>
                {tweet.hashtags.map((hashtag) => (
                  <span
                    key={hashtag._id}
                    className="mr-2 text-blue-500 hover:underline cursor-pointer text-base"
                  >
                    #{hashtag.name || ""}
                  </span>
                ))}
              </div>
              {tweet.medias && tweet.medias.length > 0 && (
                <div className="mt-3">
                  <MediaGrid
                    medias={tweet.medias}
                    onImageClick={(index) => handleImageClick(tweet, index)}
                  />
                </div>
              )}
              <div className="flex justify-between mt-3 text-gray-500">
                <div className="flex items-center space-x-1">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="w-5 h-5"
                  >
                    <g>
                      <path
                        fill="currentColor"
                        d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"
                      />
                    </g>
                  </svg>
                  <span>{tweet.comment_count || 0}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="w-5 h-5"
                  >
                    <g>
                      <path
                        fill="currentColor"
                        d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"
                      />
                    </g>
                  </svg>
                  <span>{tweet.retweet_count || 0}</span>
                </div>
                <div
                  className={`flex items-center space-x-1 cursor-pointer group ${
                    likedTweets[tweet._id]
                      ? "text-[#f91880]"
                      : "hover:text-[#f91880]"
                  }`}
                  onClick={() => handleLike(tweet._id)}
                >
                  <motion.div
                    key={likedTweets[tweet._id] ? "liked" : "not-liked"} // để animation re-trigger
                    animate={{
                      scale: likedTweets[tweet._id] ? [1, 1.3, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="w-5 h-5"
                    >
                      <g>
                        <path
                          fill={likedTweets[tweet._id] ? "#f91880" : "none"}
                          stroke="#f91880"
                          strokeWidth="1.5"
                          d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91z"
                        />
                      </g>
                    </svg>
                  </motion.div>

                  <span
                    className={likedTweets[tweet._id] ? "text-[#f91880]" : ""}
                  >
                    {likeCounts[tweet._id] || 0}
                  </span>
                </div>

                <div className="flex items-center space-x-1">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="w-5 h-5"
                  >
                    <g>
                      <path
                        fill="currentColor"
                        d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"
                      />
                    </g>
                  </svg>
                  <span>{tweet.user_views || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Loading indicator and intersection observer target */}
      <div ref={loadingRef} className="py-4 text-center">
        {loading && (
          <div className="text-gray-500">Đang tải thêm bài viết...</div>
        )}
      </div>
      <SelectedTweet
        selectedTweet={selectedTweet}
        closeModal={handleCloseModal}
        nextImage={handleNextImage}
        previousImage={handlePreviousImage}
        currentImageIndex={currentImageIndex}
      />
    </div>
  );
}
