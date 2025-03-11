"use client";
import { Button } from "@/components/ui/button";
import { useTweet } from "@/context/TweetContext";
import { MoreHorizontal } from "lucide-react";
import React from "react";

export default function Trending() {
  const { tweets: tweetData } = useTweet();

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
          {tweetData
            .filter((topic) => topic.hashtags && topic.hashtags.length > 0)
            .map((topic, index) => (
              <div key={index} className="py-1">
                <div>
                  {topic.hashtags &&
                  topic.hashtags.length > 0 &&
                  topic.user_views > 1000 ? (
                    <div className="flex justify-between">
                      <div>
                        <div className="font-bold text-base">
                          {topic.hashtags
                            .slice(0, 2)
                            .map((tag) => `#${tag.name}`)
                            .join(" ")}
                        </div>
                        <p className="text-gray-400 text-sm mt-1">
                          {topic.user_views || 0} views
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
                  ) : null}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
