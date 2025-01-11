"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const menuItems = [
  {
    menuOption: "Submit Report",
    menuLink: "/submit-report",
  },
  {
    menuOption: "Track Report",
    menuLink: "/track-report",
  },
  {
    menuOption: "How it works",
    menuLink: "/how-it-works",
  },
  {
    menuOption: "Resources",
    menuLink: "/resources",
  },
];

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="fixed top-0 border-b w-full h-16 border-white/10 bg-black/60 backdrop-blur-xl items-center flex px-7 justify-between z-50">
      {!session ? (
        <>
          <div className="flex justify-center items-center gap-2">
            <Image src="/logo.png" alt="logo" width={30} height={30} />
            <Link href={"/"} className="text-lg font-bold">
              Safe Report
            </Link>
          </div>
          <div className="gap-10 flex justify-center items-center">
            {menuItems.map((menuItem) => (
              <Link
                key={menuItem.menuOption}
                href={menuItem.menuLink}
                className="text-white/65 hover:text-white text-md transition-colors"
              >
                {menuItem.menuOption}
              </Link>
            ))}
          </div>
          <div className="px-3 py-1.5 rounded-full ring-1 ring-red-500/50 bg-red-500/10 text-red-500 flex justify-center items-center hover:bg-red-500/20 transition-all">
            <div className="w-2 inline-block bg-red-600 rounded-full h-2 mr-2 animate-pulse" />
            <Link href={"tel:112"} className="text-sm ">
              National Emergency Helpline - 112
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center gap-2">
            <Image src="/logo.png" alt="logo" width={30} height={30} />
            <Link href={"/"} className="text-lg font-bold">
              Safe Report
            </Link>
          </div>
          <div className="flex justify-center items-center gap-4">
            <p className="text-md text-white/50 hover:text-white font-medium cursor-pointer">{session.user.name}</p>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => signOut()}>Logout</Button>
          </div>
        </>
      )}
    </nav>
  );
}
