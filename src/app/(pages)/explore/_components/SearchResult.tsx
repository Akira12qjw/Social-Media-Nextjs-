import { TweetType } from "@/schemaValidations/tweet.schema";
import { formatTimeFromNow } from "@/utils/formatTimeFromNow";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function SearchResult({
  searchResults,
  isLoading,
  debouncedQuery,
}: {
  searchResults: TweetType[];
  activeTab: string;
  isLoading: boolean;
  debouncedQuery: string;
}) {
  return (
    <div className="mt-4 w-[500px]">
      {isLoading ? (
        <div className="flex justify-center p-5">
          <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
        </div>
      ) : searchResults.length > 0 ? (
        <div className="space-y-4">
          {searchResults.map((tweet) => (
            <div
              key={tweet._id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
            >
              <div className="flex items-start space-x-3">
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

                <div>
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
                  <p className="mt-1">{tweet.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : debouncedQuery.trim() ? (
        <div className="flex justify-center p-5 text-gray-500 text-center">
          Không tìm thấy kết quả nào cho {debouncedQuery}
        </div>
      ) : (
        <div className="flex justify-center p-5 text-gray-500 text-center">
          Nhấn tìm kiếm để tìm nội dung mà bạn muốn
        </div>
      )}
    </div>
  );
}
