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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
