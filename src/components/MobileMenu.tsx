import { X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

interface MobileMenuProps{
    isOpen:boolean
    onClose:() => void

}

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
    }
  ];

export default function MobileMenu({isOpen,onClose}:MobileMenuProps) {
    const pathname = usePathname()
    if(!isOpen){
        return null
    }
  return (
    <div className="fixed top-0 left-0 gap-4 bg-zinc-800 flex flex-col w-2/3 min-h-screen z-50 py-16 px-9">
        <X className='fixed  top-5 right-[9rem]' onClick={onClose}/>
            {menuItems.map((item) => (
              <Link
                key={item.option}
                href={item.path}
                className={`hover:text-white text-md transition-colors ${pathname===item.path ? "text-white font-medium ":"text-white/65" }`}
              >
                {item.option}
              </Link>
            ))}
          </div>
  )
}
