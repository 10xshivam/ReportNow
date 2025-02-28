import AuthProvider from "@/context/AuthProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quik Report",
  description: "",
  icons: {
    icon: "/QuickReport.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${inter.className} relative selection:bg-sky-500/20 bg-gradient-to-b from-gray-900 to-gray-950`}>
          <Navbar />
          {children}
          <Analytics />
          <Footer/>
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
