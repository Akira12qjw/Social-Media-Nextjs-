// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const path = req.nextUrl.pathname;
    // Danh sách các path không cần authentication
    const publicPaths = ["/"];

    // Nếu không có token và không phải public path thì redirect về login
    if (!req.nextauth.token && !publicPaths.includes(path)) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Chỉ chạy middleware nếu route không phải là public path
      authorized: ({ req, token }) => {
        const path = req.nextUrl.pathname;
        const publicPaths = ["/"];

        if (publicPaths.includes(path)) {
          return true;
        }

        return !!token;
      },
    },
  }
);

// Chỉ định các path cần được bảo vệ
export const config = {
  matcher: [
    // Các path cần bảo vệ
    "/profile",
    "/explore",
    // Thêm các protected routes khác tại đây
  ],
};
