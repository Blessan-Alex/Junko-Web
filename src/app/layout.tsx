import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Junko Industrial",
    template: "%s | Junko Industrial",
  },
  description: "Junko Industrial supplies heavy-duty packaging machinery to the GCC region.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans grid grid-rows-[auto_1fr_auto] min-h-screen antialiased bg-[#fdfcfc] dark:bg-[#0f0c1b] text-text-main dark:text-gray-100 selection:bg-primary/30 selection:text-primary-dark transition-colors duration-300`}
      >
        <Header />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
