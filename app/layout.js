import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from 'next-themes';
import { Poppins as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
});
export const metadata = {
  title: "Amit Bishnoi | Portfolio",
  description: "A Nextjs portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider attribute="class">
        <body className={fontSans.className}>{children}</body>
      </ThemeProvider>
    </html>
  );
}
