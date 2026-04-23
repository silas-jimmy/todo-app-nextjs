import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo app",
  description: "Track your todos with ease",
};

// App font family
const lexend = Lexend();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={lexend.className}>
      <body>{children}</body>
    </html>
  );
}
