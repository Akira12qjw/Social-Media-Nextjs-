"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { TweetType } from "@/schemaValidations/tweet.schema";
import { getTweets } from "@/services/tweet.service";

interface TweetContextType {
  tweets: TweetType[];
  loading: boolean;
  hasMore: boolean;
  error: string | null;
  refreshTweets: () => Promise<void>;
  loadMoreTweets: () => Promise<void>;
}

const TweetContext = createContext<TweetContextType | undefined>(undefined);

export function TweetProvider({ children }: { children: React.ReactNode }) {
  const [tweets, setTweets] = useState<TweetType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTweets = async (pageNumber: number, append: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getTweets(pageNumber);

      if (response.success) {
        const newTweets = response.data;
        setHasMore(newTweets.length === 10); // Assuming 10 is the page size

        if (append) {
          setTweets((prev) => [...prev, ...newTweets]);
        } else {
          setTweets(newTweets);
        }
      } else {
        setError(response.message || "Failed to fetch tweets");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("An error occurred while fetching tweets");
    } finally {
      setLoading(false);
    }
  };

  const refreshTweets = async () => {
    setPage(1);
    await fetchTweets(1, false);
  };

  const loadMoreTweets = async () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      await fetchTweets(nextPage, true);
    }
  };

  useEffect(() => {
    fetchTweets(1, false);
  }, []);

  const value = {
    tweets,
    loading,
    hasMore,
    error,
    refreshTweets,
    loadMoreTweets,
  };

  return (
    <TweetContext.Provider value={value}>{children}</TweetContext.Provider>
  );
}

export function useTweet() {
  const context = useContext(TweetContext);
  if (context === undefined) {
    throw new Error("useTweet must be used within a TweetProvider");
  }
  return context;
}
