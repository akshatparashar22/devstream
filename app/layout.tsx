import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans } from "./ui/fonts";



export const metadata: Metadata = {
  title: "DevStream",
  description: "Your own Timelined Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
