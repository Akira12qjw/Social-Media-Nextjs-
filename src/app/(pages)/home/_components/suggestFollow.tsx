import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTweet } from "@/context/TweetContext";
import { UnfollowModal } from "@/components/ui/unfollow-modal";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { ENDPOINTS } from "@/constants/config";

interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
}

export default function SuggestFollow() {
  const { tweets: tweetData } = useTweet();
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [followingStatus, setFollowingStatus] = useState<{
    [key: string]: boolean;
  }>({});
  const [unfollowModal, setUnfollowModal] = useState<{
    isOpen: boolean;
    userId: string;
    username: string;
  }>({
    isOpen: false,
    userId: "",
    username: "",
  });

  // Fetch danh sách following khi component mount
  useEffect(() => {
    const fetchFollowingList = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) return;

        const response = await fetch(ENDPOINTS.USERS.GET_FOLLOWING, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch following list");
        }

        const data = await response.json();
        const followingMap = data.result.reduce(
          (acc: { [key: string]: boolean }, user: User) => {
            acc[user._id] = true;
            return acc;
          },
          {}
        );

        setFollowingStatus(followingMap);
      } catch (error) {
        console.error("Error fetching following list:", error);
      }
    };

    fetchFollowingList();
  }, []);

  useEffect(() => {
    // Lấy user ID từ localStorage khi component mount
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUserId(userData._id);
    }
  }, []);

  // Lọc ra danh sách người dùng duy nhất và không bao gồm người dùng hiện tại và người đang follow
  const suggestedUsers = useMemo(() => {
    const uniqueUsers = new Map();
    tweetData.forEach((tweet) => {
      if (
        tweet.user._id !== currentUserId && // Không phải user hiện tại
        !followingStatus[tweet.user._id] && // Chưa follow
        !uniqueUsers.has(tweet.user._id) // Chưa có trong danh sách gợi ý
      ) {
        uniqueUsers.set(tweet.user._id, tweet);
      }
    });
    return Array.from(uniqueUsers.values()).slice(0, 3);
  }, [tweetData, currentUserId, followingStatus]); // Thêm followingStatus vào dependencies

  const handleFollow = async (userId: string) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        toast.error("Vui lòng đăng nhập để thực hiện chức năng này");
        return;
      }

      const response = await fetch(ENDPOINTS.USERS.FOLLOW, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followed_user_id: userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to follow user");
      }

      setFollowingStatus((prev) => ({ ...prev, [userId]: true }));
      toast.success("Đã theo dõi người dùng");
    } catch (error) {
      console.error("Follow error:", error);
      toast.error("Có lỗi xảy ra khi theo dõi");
    }
  };

  const handleUnfollow = async (userId: string) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        toast.error("Vui lòng đăng nhập để thực hiện chức năng này");
        return;
      }

      const response = await fetch(ENDPOINTS.USERS.UNFOLLOW(userId), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to unfollow user");
      }

      setFollowingStatus((prev) => ({ ...prev, [userId]: false }));
      setUnfollowModal((prev) => ({ ...prev, isOpen: false }));
      toast.success("Đã ngừng theo dõi người dùng");
    } catch (error) {
      console.error("Unfollow error:", error);
      toast.error("Có lỗi xảy ra khi ngừng theo dõi");
    }
  };

  const openUnfollowModal = (userId: string, username: string) => {
    setUnfollowModal({
      isOpen: true,
      userId,
      username,
    });
  };

  // Nếu không có gợi ý nào, không hiển thị component
  if (suggestedUsers.length === 0) return null;

  return (
    <>
      <Card className="bg-gray-50 max-w-md w-full border-none">
        <CardHeader>
          <CardTitle>Gợi ý theo dõi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestedUsers.map((data) => (
            <div
              key={data.user._id}
              className="flex items-center justify-between"
            >
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
                  <div className="font-bold truncate max-w-xs hover:underline cursor-pointer">
                    {data.user.username.length > 9
                      ? `${data.user.username.substring(0, 9)}...`
                      : data.user.username}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {" "}
                    @
                    {data.user.email?.split("@")[0].length > 9
                      ? `${data.user.email?.split("@")[0].substring(0, 9)}...`
                      : data.user.email?.split("@")[0]}
                  </div>
                </div>
              </div>
              <Button
                className={`rounded-full font-bold ${
                  followingStatus[data.user._id]
                    ? "bg-white text-black hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                    : " bg-black text-white hover:bg-gray-800 hover:text-white "
                }`}
                variant="outline"
                onClick={() =>
                  followingStatus[data.user._id]
                    ? openUnfollowModal(data.user._id, data.user.username)
                    : handleFollow(data.user._id)
                }
              >
                {followingStatus[data.user._id] ? "Đang theo dõi" : "Theo dõi"}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <UnfollowModal
        isOpen={unfollowModal.isOpen}
        onClose={() => setUnfollowModal((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={() => handleUnfollow(unfollowModal.userId)}
        username={unfollowModal.username}
      />
    </>
  );
}
