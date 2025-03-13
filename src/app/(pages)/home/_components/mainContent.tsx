"use client";
import { Search } from "lucide-react";
import SuggestFollow from "./suggestFollow";
import Trending from "./Trending";
import Feeds from "../../tweet/_components/Feeds";
import { useTweet } from "@/context/TweetContext";
import Post from "../../tweet/_components/button-post";

export default function MainContent() {
  const { tweets, loading, hasMore, loadMoreTweets } = useTweet();

  return (
    <div className="flex">
      {/* Main feed */}
      <div className="flex-1 min-h-screen border-x border-gray-200">
        {/* Header - Fixed at top */}
        <div className="fixed top-0 z-50 bg-white/60 backdrop-blur w-[660px] border-x border-gray-200">
          <div className="flex h-14">
            <div className="flex-1 flex items-center justify-center  hover:bg-gray-200/70 cursor-pointer transition-colors">
              <span className="text-[15px] font-medium">Dành cho bạn</span>
            </div>
            <div className="flex-1 flex items-center justify-center hover:bg-gray-200/70 cursor-pointer transition-colors">
              <span className="text-[15px] font-medium text-gray-600">
                Theo dõi
              </span>
            </div>
          </div>
          <div className="h-1 w-1/2 bg-sky-500"></div>
        </div>
        {/* Padding top để tránh content bị che bởi fixed header */}
        <div className="pt-[60px]">
          <Post />
          {/* Feed content */}
          <Feeds
            tweetData={tweets}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={loadMoreTweets}
          />
        </div>
      </div>

      {/* Right sidebar */}
      <div className="w-[350px] relative">
        <div className="pl-8 py-2 fixed w-[350px]">
          {/* Search bar */}
          <div className="sticky top-2 z-40 bg-white pb-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 ring-offset-background focus-visible:ring-sky-500 focus-visible:ring-2 focus-visible:outline-none"
              />
            </div>
          </div>

          {/* Trending and Suggestions */}
          <div className="space-y-4 mt-4 max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="bg-gray-50 rounded-xl">
              <Trending />
            </div>
            <div className="bg-gray-50 rounded-xl">
              <SuggestFollow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
