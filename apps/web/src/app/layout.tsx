import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CSRadrX",
  description: "Real-time technology intelligence dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-black text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
