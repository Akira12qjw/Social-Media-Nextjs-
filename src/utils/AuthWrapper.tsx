"use client";
import React from "react";
import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loading />
      </div>
    );
  }
  if (!isAuthenticated) {
    return null;
  }
  return <div className="h-screen flex">{children}</div>;
}
