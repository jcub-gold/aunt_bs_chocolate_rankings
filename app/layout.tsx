import { ClerkProvider } from "@clerk/nextjs";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aunt B’s 2025 Holiday Chocolate Ratings",
  description: "Rank holiday chocolates with family & friends 🍫🎄",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* Navigation */}
          <nav className="flex gap-6 p-4 border-b items-center">
            <Link href="/" className="font-semibold">
              Home
            </Link>
            <Link href="/rank">My Rankings</Link>
            <Link href="/leaderboard">Leaderboard</Link>

            <div className="ml-auto">
              <SignedOut>
                <SignInButton />
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </nav>

          {/* Page content */}
          {children}
        </body>
      </html>
    </ClerkProvider>
    
  );
}