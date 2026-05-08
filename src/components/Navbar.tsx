"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-14 sm:h-16 bg-bg-primary/95 backdrop-blur-md z-[1000] border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          <Link href="/" className="text-lg sm:text-xl font-bold text-text-primary tracking-tight z-[1010]">
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
            className="md:hidden p-2 text-text-primary z-[1010] relative"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Full screen solid overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-[999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#121212" }}
        >
          <ul className="flex flex-col items-center gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block px-10 py-4 rounded-xl text-xl font-semibold text-center transition-all duration-200",
                    pathname === link.href
                      ? "text-accent bg-accent/10"
                      : "text-text-secondary hover:text-text-primary"
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
    </>
  );
}
