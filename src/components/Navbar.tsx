"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Experience", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-bg-primary/90 backdrop-blur-xl z-[1000] border-bottom border-white/5">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-text-primary tracking-tight">
          Muhammad <span className="text-accent">Reyka</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm font-medium px-4 py-2 rounded-md transition-all duration-150 relative",
                  pathname === link.href
                    ? "text-accent"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-highlight"
                )}
              >
                {link.name}
                {pathname === link.href && (
                  <span className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-5 h-[3px] bg-accent rounded-full" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-text-primary"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-bg-secondary border-b border-white/5 animate-slide-down">
          <ul className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block px-4 py-3 rounded-md text-base font-medium",
                    pathname === link.href
                      ? "text-accent bg-bg-highlight"
                      : "text-text-secondary"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
