import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://meshop.world"),
  title: "meShop — Shopping is personal",
  description:
    "meShop is the space between wanting something and finding exactly the right one. A personal shopping system. Open source. Built in the open.",
  icons: {
    icon: [
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicons/favicon-32x32.png",
    apple: "/favicons/favicon-32x32.png",
  },
  openGraph: {
    title: "meShop — Shopping is personal",
    description:
      "A personal shopping system driven by curiosity, taste, and passion.",
    url: "https://meshop.world",
    siteName: "meShop",
    images: [
      {
        url: "/moodboard.jpg",
        width: 1200,
        height: 630,
        alt: "meShop Moodboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "meShop — Shopping is personal",
    description:
      "A personal shopping system driven by curiosity, taste, and passion.",
    images: ["/moodboard.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable}`}>
      <body className="antialiased selection:bg-[#C27A3C]/20 bg-[var(--color-bg)] text-[var(--color-text-body)]">
        {children}
      </body>
    </html>
  );
}
