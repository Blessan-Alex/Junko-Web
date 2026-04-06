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
  metadataBase: new URL("https://www.junko-fze.com"),
  title: {
    default: "Junko Industrial | Packaging Machinery Supplier UAE",
    template: "%s | Junko Industrial",
  },
  description: "Junko Industrial supplies heavy-duty packaging machinery, sealing equipment, and consumables to the GCC region from Sharjah.",
  openGraph: {
    siteName: 'Junko Industrial',
    type: 'website',
    locale: 'en_AE',
    images: [
      {
        url: '/hero-commercial-dock.jpg',
        width: 1200,
        height: 630,
        alt: 'Junko Industrial Packaging Machinery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Junko Industrial | Packaging Machinery Supplier UAE',
    description: 'Junko Industrial supplies heavy-duty packaging machinery, sealing equipment, and consumables to the GCC region from Sharjah.',
    images: ['/hero-commercial-dock.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-0W9XSX8PTD"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-0W9XSX8PTD');
`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link rel="preload" as="image" href="/hero-commercial-dock.jpg" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans grid grid-rows-[auto_1fr_auto] min-h-screen antialiased bg-[#fdfcfc] dark:bg-[#0f0c1b] text-text-main dark:text-gray-100 selection:bg-primary/30 selection:text-primary-dark transition-colors duration-300`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded focus:text-sm focus:font-bold">Skip to main content</a>
        <Header />
        <main id="main-content" className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
