"use client";
// import Header from "@/components/header";
import MainContent from "@/components/mainContent";
import SideBar from "@/components/SideBar";
import { useAuth } from "@/hooks/useAuth";
import React from "react";

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        {/* Outer spinning circle */}
        <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-500 animate-spin"></div>

        {/* Optional loading text */}
        <p className="ml-4 text-gray-600 text-sm">Đang tải...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Sẽ được redirect bởi useAuth hook
  }

  return (
    <div className="h-screen flex">
      {/* <Header /> */}
      <SideBar />
      <MainContent />
    </div>
  );
}
