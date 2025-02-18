import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TweetType } from "@/schemaValidations/tweet.schema";
import { MoreHorizontal } from "lucide-react";
import React from "react";

export default function Trending({ tweetData }: { tweetData: TweetType[] }) {
  // const formatPostCount = (count: number): string => {
  //   if (count >= 1000 && count < 1000000) {
  //     return `${(count / 1000).toFixed(1).replace(/\.0$/, "")} N`;
  //   }
  //   return count.toString();
  // };

  return (
    <>
      <Card className="max-w-md w-full border-none">
        <CardContent className="p-5">
          <h2 className="text-xl font-bold mb-4">Những điều đang diễn ra</h2>
          {tweetData
            .filter((topic) => topic.hashtags && topic.hashtags.length > 0)
            .map((topic, index) => (
              <div key={index} className="py-1">
                <div>
                  {topic.hashtags && topic.hashtags.length > 0 ? (
                    <div className="flex justify-between">
                      <div>
                        <div className="font-bold text-base">
                          {topic.hashtags
                            .slice(0, 3)
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
          {/* <Button variant="link" className="text-blue-400 mt-2 p-0 h-auto">
            Hiển thị thêm
          </Button> */}
        </CardContent>
      </Card>
    </>
  );
}
