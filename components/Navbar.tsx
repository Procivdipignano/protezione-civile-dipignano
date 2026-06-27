"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/volontariato", label: "Volontariato" },
  { href: "/chi-siamo", label: "Chi Siamo" },
  { href: "/contatti", label: "Contatti" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-pc-navy shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.jpg"
            alt="Logo Protezione Civile Dipignano"
            width={44}
            height={44}
            className="rounded-full"
          />
          <span className="text-white font-bold text-sm hidden sm:block">
            PROTEZIONE CIVILE DIPIGNANO
          </span>
        </Link>
        <ul className="hidden md:flex gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-white text-sm hover:text-pc-red transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <button className="md:hidden text-white text-2xl" aria-label="Menu">
          ☰
        </button>
      </div>
    </nav>
  );
}
