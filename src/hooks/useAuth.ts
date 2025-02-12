// hooks/useAuth.ts

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuth = (requireAuth: boolean = true) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (requireAuth && status === "unauthenticated") {
      router.push("/");
    }

    // Optional: Redirect away from login page if already authenticated
    if (!requireAuth && status === "authenticated") {
      router.push("/home");
    }
  }, [requireAuth, status, router]);

  return {
    session,
    status,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
  };
};
