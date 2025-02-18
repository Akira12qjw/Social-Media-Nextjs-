"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../../../../components/ui/input";
import Feeds from "../../tweet/_components/Feeds";
import Post from "@/app/(pages)/tweet/_components/button-post";
import { getTweet } from "@/utils/getTweet";
import { TweetType } from "@/schemaValidations/tweet.schema";
import Trending from "./Trending";
import SuggestFollow from "./suggestFollow";

export default function MainContent() {
  const [tweetData, setTweetData] = useState<TweetType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTweet();
        setTweetData(data.tweets);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-grow flex-shrink p-5">
      <div className="w-full border-r border-gray-200">
        {/* Header Section */}
        <div className="h-10 w-10"></div>
        <div className="fixed top-[-2px] z-10 w-full md:w-[679px] bg-white/95 border-b border-gray-200">
          <div className=" mx-auto px-4 py-3">
            <div className="flex gap-8 items-center justify-between">
              <div className="text-xl  font-bold cursor-pointer text-gray-500 hover:text-black pr-7">
                Dành cho bạn
              </div>
              <div className="text-xl font-bold text-gray-500 cursor-pointer hover:text-black">
                Theo dõi
              </div>
              <div className="relative">
                <Input
                  className="w-auto rounded-full p-5 ps-10"
                  type="text"
                  placeholder="Tìm kiếm"
                />
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Post Creation Section */}
        <Post />

        {/* Feed Section */}
        <div className=" divide-y divide-gray-200 ">
          {/* Feed content will go here */}
          <Feeds tweetData={tweetData} loading={loading} />
        </div>
      </div>
      <div className="ml-4 w-[40%]">
        <div className=" border rounded-xl fixed">
          <Trending tweetData={tweetData} />
        </div>
        <div className="mt-48 border rounded-xl fixed">
          <SuggestFollow tweetData={tweetData} />
        </div>
      </div>
    </div>
  );
}
