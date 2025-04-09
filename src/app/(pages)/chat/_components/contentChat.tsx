/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { ENDPOINTS } from "@/constants/config";
import socket from "@/socket";
import { useEffect, useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "sonner";
import { formatTimeFromNow } from "@/utils/formatTimeFromNow";

interface Conversation {
  _id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  created_at?: string;
}

interface Profile {
  _id: string;
  name: string;
  username: string;
  avatar?: string;
}

interface ConversationPayload {
  content: string;
  sender_id: string;
  receiver_id: string;
}

interface SendMessageEvent {
  payload: ConversationPayload;
}

const LIMIT = 10;
const PAGE = 1;

interface ContentChatProps {
  receiver: Profile | null;
}

export default function ContentChat({ receiver }: ContentChatProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [value, setValue] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [pagination, setPagination] = useState({
    page: PAGE,
    total_page: 0,
  });

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  const fetchConversations = useCallback(
    async (page = PAGE) => {
      if (!receiver?._id || !profile?._id) return;

      try {
        setLoading(true);
        const response = await fetch(
          `${ENDPOINTS.CONVERSATIONS.GET_MESSAGES(
            receiver._id
          )}?limit=${LIMIT}&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch conversations");
        }

        const {
          conversations: newConversations,
          page: currentPage,
          total_page,
        } = data.result;

        setConversations((prev) =>
          page === PAGE ? newConversations : [...prev, ...newConversations]
        );

        setPagination({
          page: currentPage,
          total_page,
        });
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Error fetching conversations"
        );
      } finally {
        setLoading(false);
      }
    },
    [receiver?._id, profile?._id]
  );

  const send = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const trimmedValue = value.trim();
      if (!trimmedValue || !receiver?._id) {
        toast.error("Please enter a message and select a recipient");
        return;
      }

      try {
        setSending(true);
        const conversation: ConversationPayload = {
          content: trimmedValue,
          sender_id: profile!._id,
          receiver_id: receiver._id,
        };

        const tempMessage: Conversation = {
          _id: Date.now().toString(),
          content: trimmedValue,
          sender_id: profile!._id,
          receiver_id: receiver._id,
          created_at: new Date().toISOString(),
        };

        setConversations((prev) => [tempMessage, ...prev]);

        socket.emit("send_message", {
          payload: conversation,
        } as SendMessageEvent);

        setValue("");
      } catch (error) {
        toast.error("Failed to send message");
        setConversations((prev) =>
          prev.filter((msg) => msg._id !== Date.now().toString())
        );
      } finally {
        setSending(false);
      }
    },
    [value, receiver?._id, profile]
  );

  useEffect(() => {
    if (receiver?._id) {
      fetchConversations();
      setConversations([]); // Clear conversations when changing receiver
    }
  }, [receiver?._id, fetchConversations]);

  useEffect(() => {
    const handleReceiveMessage = (data: { payload: Conversation }) => {
      const { payload } = data;
      // Kiểm tra xem tin nhắn có thuộc về cuộc trò chuyện hiện tại không
      if (
        payload &&
        receiver?._id &&
        profile?._id &&
        ((payload.sender_id === receiver._id &&
          payload.receiver_id === profile._id) ||
          (payload.sender_id === profile._id &&
            payload.receiver_id === receiver._id))
      ) {
        setConversations((prev) => {
          // Kiểm tra xem tin nhắn đã tồn tại chưa
          const existingMessage = prev.find((msg) => msg._id === payload._id);
          if (existingMessage) {
            return prev;
          }

          // Nếu là tin nhắn tạm thời (đang gửi), thay thế bằng tin nhắn thật
          const tempMessageIndex = prev.findIndex(
            (msg) =>
              msg.content === payload.content &&
              msg.sender_id === payload.sender_id &&
              msg._id.toString().length > 10
          );

          if (tempMessageIndex !== -1) {
            const newConversations = [...prev];
            newConversations[tempMessageIndex] = payload;
            return newConversations;
          }

          // Thêm tin nhắn mới vào đầu danh sách
          return [payload, ...prev];
        });
      }
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [receiver?._id, profile?._id]);

  const loadMore = () => {
    if (pagination.page < pagination.total_page) {
      fetchConversations(pagination.page + 1);
    }
  };

  if (!receiver) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Select a conversation to start messaging
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-300 flex items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full mr-4">
          {receiver.avatar && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={receiver.avatar}
              alt={receiver.name}
              className="w-full h-full rounded-full object-cover"
            />
          )}
        </div>
        <div>
          <h3 className="font-bold">{receiver.name}</h3>
          <p className="text-sm text-gray-500">{receiver.username}</p>
        </div>
      </div>

      {/* Messages */}
      <div
        id="scrollableDiv"
        className="flex-1 overflow-y-auto flex flex-col-reverse p-4"
      >
        <InfiniteScroll
          dataLength={conversations.length}
          next={loadMore}
          hasMore={pagination.page < pagination.total_page}
          loader={<div className="text-center p-2">Loading...</div>}
          inverse={true}
          scrollableTarget="scrollableDiv"
        >
          <div className="flex flex-col-reverse gap-4">
            {conversations.map((msg) => (
              <div
                key={msg._id}
                className={`flex ${
                  msg.sender_id === profile?._id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.sender_id === profile?._id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  <p className="break-words">{msg.content}</p>
                  {msg.created_at && (
                    <p className="text-xs mt-1 opacity-70">
                      {formatTimeFromNow(msg.created_at)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>

      {/* Input */}
      <form onSubmit={send} className="p-4 border-t border-gray-300">
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={sending || !value.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}
