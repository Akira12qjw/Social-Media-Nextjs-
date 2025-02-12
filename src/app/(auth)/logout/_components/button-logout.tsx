"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function ButtonLogout() {
  const [isLoading, setIsLoading] = useState(false);

  const clearLocalStorage = () => {
    const tokensToRemove = ["accessToken", "refreshToken"];
    tokensToRemove.forEach((token) => localStorage.removeItem(token));
  };

  const handleLogout = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      clearLocalStorage();
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Logout error:", error);
      // Ensure tokens are cleared even if signOut fails
      clearLocalStorage();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      className="font-bold rounded-full w-full"
      disabled={isLoading}
    >
      {isLoading ? "Đang xử lý..." : "Đăng xuất"}
    </Button>
  );
}
