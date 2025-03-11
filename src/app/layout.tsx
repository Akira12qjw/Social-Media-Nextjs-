import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { TweetProvider } from "@/context/TweetContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SessionProvider } from "@/SessionProvider";
import TokenHandler from "@/components/TokenHandler";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter Clone",
  description: "A Twitter clone built with Next.js and TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <SidebarProvider>
            <TokenHandler />
            <TweetProvider>
              {children}
              <Toaster />
            </TweetProvider>
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
