import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "CoverCraft — AI Resume & Job Match Studio",
  description: "AI-powered semantic analysis revealing real alignment, keyword coverage, and section strengths.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300..700&display=swap"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-[#09090b] text-[#f4f4f5] antialiased min-h-screen selection:bg-indigo-600/30 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
