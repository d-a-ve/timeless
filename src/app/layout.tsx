import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { CartButton } from "~/components/cart/cart-button";
import GlobalProvider from "~/providers";
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
  title: "Timeless shop",
  description:
    "Get yourself and your loved ones statement pieces that are timeless.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} grid min-h-screen grid-rows-[auto,1fr,auto] antialiased`}
      >
        <GlobalProvider>
          <header className="flex items-center justify-between gap-4 p-4">
            <p>Header component</p>
            <Suspense>
              <CartButton />
            </Suspense>
          </header>
          {children}
        </GlobalProvider>
        <footer>
          <p>Footer component</p>
        </footer>
      </body>
    </html>
  );
}
