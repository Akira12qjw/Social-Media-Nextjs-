"use client";
import { useState } from "react";
import ContentChat from "./_components/contentChat";
import ListUserMessage from "./_components/listUserMessage";
import SideBar from "../home/_components/SideBar";

interface SelectedUser {
  _id: string;
  name: string;
  username: string;
  avatar?: string;
}

export default function Chat() {
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);

  const handleUserSelect = (user: SelectedUser) => {
    setSelectedUser(user);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      <SideBar />
      <div className="w-[300px] border-r border-gray-300">
        <ListUserMessage
          onSelectUser={handleUserSelect}
          selectedUserId={selectedUser?._id}
        />
      </div>
      <div className="flex-1 w-[700px]">
        <ContentChat receiver={selectedUser} />
      </div>
    </div>
  );
}
