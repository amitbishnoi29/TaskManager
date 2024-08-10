import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from 'next-themes';
import { Poppins as FontSans } from "next/font/google";
import { NextUIProvider } from '@nextui-org/react'
import Navigation from "@/components/Navigation";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
});
export const metadata = {
  title: "Task manger",
  description: "A  simple task manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <NextUIProvider>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <body className={`${fontSans.className} bg-lightBg dark:bg-darkBg`}>{children}</body>
          <Navigation />
        </ThemeProvider>
      </NextUIProvider>
    </html>
  );
}
