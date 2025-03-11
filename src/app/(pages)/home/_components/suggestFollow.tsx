import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTweet } from "@/context/TweetContext";

import React from "react";

export default function SuggestFollow() {
  const { tweets: tweetData } = useTweet();
  return (
    <>
      <Card className="bg-gray-50 max-w-md w-full border-none">
        <CardHeader>
          <CardTitle>Gợi ý theo dõi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {tweetData.slice(0, 3).map((data, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={
                      data.user.avatar ||
                      "https://res.cloudinary.com/dwyvtyasp/image/upload/v1734597632/xgkaepsmtzdf25tqtzsi.png"
                    }
                    alt={data.user.username}
                  />
                </Avatar>
                <div>
                  <div className="font-bold">{data.user.username}</div>
                  <div className="text-gray-500 text-sm">{data.user.email}</div>
                </div>
              </div>
              <Button
                className="rounded-full bg-black text-white font-bold hover:bg-gray-800 hover:text-white "
                variant="outline"
              >
                Theo dõi
              </Button>
            </div>
          ))}
          {/* <Button
            variant="link"
            className="text-blue-400 hover:text-blue-300 p-0"
          >
            Hiển thị thêm
          </Button> */}
        </CardContent>
      </Card>
    </>
  );
}
