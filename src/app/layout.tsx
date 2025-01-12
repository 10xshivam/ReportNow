import AuthProvider from "@/context/AuthProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quick Report",
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
        <body className={`${inter.className} relative`}>
          <Navbar />
          {children}
          <Footer/>
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
