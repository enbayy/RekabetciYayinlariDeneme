'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  const navLinks = [
    { href: '/', label: 'Anasayfa' },
    { href: '/denemeler', label: 'Denemeler' },
    { href: '/hakkimizda', label: 'Hakkımızda' },
    { href: '/iletisim', label: 'İletişim' },
  ];

  return (
    <>
      <nav className="fixed top-2 left-1/2 transform -translate-x-1/2 w-[95%] lg:w-[90%] bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200 rounded-xl z-50 transition-all">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3">
              <img
                src="/rbylogo2.png"
                alt="Logo"
                className="h-16 w-auto rounded-lg"
              />
              <span className="hidden sm:block text-slate-900 text-lg font-bold font-display">
                Rekabetçi Yayınları
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-700 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3 ml-4">
            <Link
              href="/uye-ol"
              className="text-slate-700 hover:text-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              Üye Ol
            </Link>
            <Link
              href="/giris-yap"
              className="bg-blue-700 text-white hover:bg-blue-800 px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md"
            >
              Giriş Yap
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-slate-700 hover:text-blue-700 p-2 rounded-md"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden px-4 py-3 bg-white/95 backdrop-blur-md border-t border-slate-200 flex flex-col gap-2 rounded-b-xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-slate-700 hover:text-blue-700 hover:bg-blue-50 block px-4 py-2 rounded-lg text-base font-medium transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Link
                href="/uye-ol"
                onClick={closeMenu}
                className="text-slate-700 hover:text-blue-700 hover:bg-blue-50 block px-4 py-2 rounded-lg text-base font-medium transition-all duration-200"
              >
                Üye Ol
              </Link>
              <Link
                href="/giris-yap"
                onClick={closeMenu}
                className="bg-blue-700 text-white hover:bg-blue-800 block px-4 py-2 rounded-lg text-base font-semibold transition-all duration-200"
              >
                Giriş Yap
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Placeholder for page content so navbar doesn't overlap */}
      <div className="pt-[80px]"></div>
    </>
  );
}
