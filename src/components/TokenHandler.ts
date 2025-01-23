// components/TokenHandler.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function TokenHandler() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.accessToken && session?.user?.refreshToken) {
      localStorage.setItem("accessToken", session.user.accessToken);
      localStorage.setItem("refreshToken", session.user.refreshToken);
    }
  }, [session]);

  return null;
}
