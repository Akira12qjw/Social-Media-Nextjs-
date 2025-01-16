import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    // Google OAuth provider configuration
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid profile",
        },
      },
    }),
  ],
};
