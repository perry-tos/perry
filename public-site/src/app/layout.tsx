import type { Metadata } from "next";
import { Momo_Trust_Display, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const momoTrustDisplay = Momo_Trust_Display({
  variable: "--font-momo-trust-display",
  subsets: ["latin"],
  weight: "400",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Perry",
    template: "%s — Perry",
  },
  description:
    "Terms changed. You didn't notice. Perry did. Your vendors write ToS for lawyers, Perry writes them for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${momoTrustDisplay.variable} ${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
