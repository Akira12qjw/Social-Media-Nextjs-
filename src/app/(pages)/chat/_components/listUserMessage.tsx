"use client";
import { getFollowing } from "@/services/profile.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface User {
  _id: string;
  name: string;
  username: string;
  avatar?: string;
}

interface Props {
  onSelectUser: (user: User) => void;
  selectedUserId?: string;
}

export default function ListUserMessage({
  onSelectUser,
  selectedUserId,
}: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFollowingUsers = async () => {
      try {
        setLoading(true);
        const response = await getFollowing();
        if (response.success && response.data) {
          setUsers(response.data);
        } else {
          throw new Error(
            response.message || "Failed to fetch following users"
          );
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFollowingUsers();
  }, []);

  return (
    <div className="h-full overflow-y-auto">
      <h2 className="text-lg font-bold p-4 border-b border-gray-300">
        Người đang theo dõi
      </h2>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      ) : (
        <ul>
          {users.map((user) => (
            <li
              key={user._id}
              onClick={() => onSelectUser(user)}
              className={`flex items-center p-4 hover:bg-gray-100 cursor-pointer border-b border-gray-100 ${
                selectedUserId === user._id ? "bg-gray-100" : ""
              }`}
            >
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-4">
                {user.avatar && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold truncate">{user.name}</p>
                <p className="text-sm text-gray-500 truncate">
                  {user.username}
                </p>
              </div>
            </li>
          ))}
          {users.length === 0 && !loading && (
            <li className="p-4 text-center text-gray-500">
              Bạn chưa theo dõi ai
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
