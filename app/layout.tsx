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
  title: "박민욱 | 포트폴리오",
  description:
    "탄탄한 기본기를 바탕으로 사용자 중심의 웹 서비스를 만드는 개발자 박민욱입니다.",
  openGraph: {
    title: "박민욱 | 포트폴리오",
    description:
      "탄탄한 기본기를 바탕으로 사용자 중심의 웹 서비스를 만드는 개발자 박민욱입니다.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
