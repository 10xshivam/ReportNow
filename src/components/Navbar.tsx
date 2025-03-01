"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { FiGithub } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

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
    option: "Nearby Support",
    path: "/nearby-support",
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
    <nav className="fixed top-0 w-full h-16 border-b border-white/10 backdrop-blur-xl items-center flex px-10 justify-between z-50 max-md:px-4">
      {!session ? (
        <>
          <div className="flex justify-center items-center gap-6">
            <Link href={"/"} className="text-xl font-extrabold">
              Report<span className="text-red-500">Now</span>
            </Link>
          </div>
          <div className="gap-8 flex justify-center items-center max-md:hidden rounded-xl px-8">
            {menuItems.map((item) => (
              <Link
                key={item.option}
                href={item.path}
                className={`hover:text-white tracking-tight transition-colors ${
                  pathname === item.path
                    ? "text-white font-medium "
                    : "text-white/65"
                }`}
              >
                {item.option}
              </Link>
            ))}
          </div>
          <div className="flex gap-5 max-md:hidden">
            <Link href={"https://github.com/10xshivam/ReportNow"} target="_blank">
              <FiGithub size={25} className="text-zinc-400 hover:text-gray-300" />
            </Link>
            <Link href={"https://x.com/shivamcodes_"} target="_blank">
              <FaXTwitter size={25} className="text-zinc-400 hover:text-gray-300" />
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
