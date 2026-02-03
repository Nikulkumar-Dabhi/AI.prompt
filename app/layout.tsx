import type { Metadata } from "next";
import { Outfit, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://promptmaster.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Prompt Master — Find & Use AI Prompts",
  description:
    "All-in-one hub for high-quality prompts for ChatGPT, Cursor, Claude, Copilot, and more. Find, customize, and copy prompts for coding, writing, analysis, and productivity.",
  openGraph: {
    title: "Prompt Master — Find & Use AI Prompts",
    description: "All-in-one hub for high-quality prompts for ChatGPT, Cursor, Claude, Copilot, and more.",
    url: siteUrl,
    siteName: "Prompt Master",
    locale: "en_US",
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
      lang="en"
      className={`${outfit.variable} ${dmSans.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
