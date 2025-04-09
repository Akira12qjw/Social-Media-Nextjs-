/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";
import { useTweet } from "@/context/TweetContext";
import { MoreHorizontal } from "lucide-react";
import React from "react";

export default function Trending() {
  const { tweets: tweetData } = useTweet();

  const hashtagViews = new Map();

  tweetData.forEach((tweet) => {
    if (tweet.hashtags && tweet.hashtags.length > 0) {
      tweet.hashtags.forEach((tag) => {
        const views = hashtagViews.get(tag.name) || 0;
        hashtagViews.set(tag.name, views + (tweet.user_views || 0));
      });
    }
  });

  const trendingHashtags = Array.from(hashtagViews.entries())
    .filter(([_, views]) => views >= 110)
    .sort(([_, a], [__, b]) => b - a)
    .slice(0, 3)
    .map(([name, views]) => ({ name, views }));

  if (trendingHashtags.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 rounded-xl">
      <div className="p-3">
        <span className="text-xl font-bold">Xu hướng cho bạn</span>
      </div>
      <div className="hover:bg-gray-200 cursor-pointer">
        <div className="p-3">
          <div className="flex items-center text-sm text-gray-500">
            <span>Đang thịnh hành</span>
          </div>
          {trendingHashtags.map((hashtag, index) => (
            <div key={index} className="py-1">
              <div>
                <div className="flex justify-between">
                  <div>
                    <div className="font-bold text-base">#{hashtag.name}</div>
                    <p className="text-gray-400 text-sm mt-1">
                      {hashtag.views} views
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 text-gray-400"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
