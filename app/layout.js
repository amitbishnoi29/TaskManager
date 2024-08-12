import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Poppins as FontSans } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import Navigation from "@/components/Navigation";
import { Toaster } from "react-hot-toast";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

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
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css"
        />
      </head>
      <NextUIProvider>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ClerkProvider>
            <body className={`${fontSans.className} bg-lightBg dark:bg-darkBg mt-[90px]`}>
              <Navbar />
              {children}
              <Navigation />
              <Toaster />
            </body>
          </ClerkProvider>
        </ThemeProvider>
      </NextUIProvider>
    </html>
  );
}
