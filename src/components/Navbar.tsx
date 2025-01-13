"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

const menuItems = [
  {
    option: "Home",
    path: "/",
  },
  {
    option: "Submit Report",
    path: "/submit-report",
  },
  {
    option: "Track Report",
    path: "/track-report",
  },
  {
    option: "How it works",
    path: "/how-it-works",
  },
];

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  return (
    <nav className="fixed top-0  w-full h-16 border-b border-white/10  bg-black/60 backdrop-blur-xl items-center flex px-7 justify-between z-50 max-md:px-4">
      {!session ? (
        <>
          <div className="flex justify-center items-center gap-0.5">
            <Image src="/QuickReport.png" alt="logo" width={30} height={30} />
            <Link href={"/"} className="text-lg font-extrabold">
              <span className="text-[#006fff]">uick</span> Report
            </Link>
          </div>
          <div className="gap-10 flex justify-center items-center max-md:hidden">
            {menuItems.map((item) => (
              <Link
                key={item.option}
                href={item.path}
                className={`hover:text-white text-md transition-colors ${
                  pathname === item.path
                    ? "text-white font-medium "
                    : "text-white/65"
                }`}
              >
                {item.option}
              </Link>
            ))}
          </div>
          <div className="px-3 py-1.5 rounded-full ring-1 ring-red-500/50 bg-red-500/10 text-red-500 flex justify-center items-center hover:bg-red-500/20 transition-all max-md:hidden">
            <div className="w-2 inline-block bg-red-600 rounded-full h-2 mr-2 animate-pulse" />
            <Link href={"tel:112"} className="text-sm ">
              National Emergency Helpline - 112
            </Link>
          </div>
          <div className="hidden max-md:block">
            <button onClick={() => setIsMobileOpen(true)}>
              <Menu />
            </button>
          </div>
          <MobileMenu
            isOpen={isMobileOpen}
            onClose={() => setIsMobileOpen(false)}
          />
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold text-white/90">Dashboard</h2>
          <div className="flex justify-center items-center gap-4">
            <p className="text-md text-white/50 hover:text-white font-medium cursor-pointer">
              {session.user.name}
            </p>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </div>
        </>
      )}
    </nav>
  );
}
