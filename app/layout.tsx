import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans } from "./ui/fonts";



export const metadata: Metadata = {
  title: "Timeline Portfolio",
  description: "Upload your resume | Get Timelined Portfolio",
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
