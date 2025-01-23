import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Vui lòng nhập email và mật khẩu");
          }

          const response = await fetch("http://localhost:4000/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || "Đăng nhập thất bại");
          }

          if (data.result?.access_token) {
            // Lưu token vào localStorage

            console.log("Data: ", data);

            return {
              id: "1",
              email: credentials.email,
              accessToken: data.result.access_token,
              refreshToken: data.result.refresh_token,
            };
          }

          return null;
        } catch (error) {
          console.error("Lỗi đăng nhập:", error);
          if (error instanceof Error) {
            throw new Error(error.message || "Lỗi đăng nhập");
          } else {
            throw new Error("Lỗi đăng nhập");
          }
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.accessToken = token.accessToken as string;
        session.user.refreshToken = token.refreshToken as string;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
};
