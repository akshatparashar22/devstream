import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans } from "./ui/fonts";
import { ThemeProvider } from "next-themes";



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
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
