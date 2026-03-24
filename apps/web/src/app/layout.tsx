import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://csradrx.live"),
  title: {
    default: "CSRadrX — Signal over Noise in AI & Tech",
    template: "%s | CSRadrX",
  },
  description:
    "CSRadrX tracks, analyzes, and ranks updates across AI, GitHub, and tech — so you only see what actually matters.",
  keywords: [
    "AI updates",
    "tech news",
    "developer tools",
    "GitHub trends",
    "AI intelligence",
    "software engineering news",
  ],
  authors: [{ name: "CSRadrX" }],
  openGraph: {
    title: "CSRadrX — High Signal Tech Intelligence",
    description:
      "Stop scrolling. Start knowing. CSRadrX delivers only what matters in AI and technology.",
    url: "https://csradrx.live/",
    siteName: "CSRadrX",
    images: [
      {
        url: "https://csradrx.live/og-image.jpg?v=2",
        width: 1200,
        height: 630,
        alt: "CSRadrX — Signal over Noise",
      },
    ],
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "CSRadrX — High Signal Tech Intelligence",
    description: "All the important updates. None of the noise.",
    images: ["https://csradrx.live/og-image.jpg?v=2"],
    creator: "@csradrx",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/logo/icon-only.jpg", type: "image/jpeg" },
    ],
    shortcut: "/logo/icon-only.jpg",
    apple: "/logo/icon-only.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
