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
        <body className={`${inter.className} relative selection:bg-sky-500/20`}>
          <Navbar />
          {children}
          <Analytics />
          <Footer/>
          <Toaster />
          <div className="fixed inset-0 -z-10 min-h-screen">
            <div className="absolute inset-0 h-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03),transparent_50%)]" />
            <div className="absolute inset-0 h-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.04),transparent_70%)]" />
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
