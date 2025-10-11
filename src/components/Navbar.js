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

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-white text-xl font-bold">
              LOGO
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Anasayfa
              </Link>
              <Link
                href="/denemeler"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Denemeler
              </Link>
              <Link
                href="/hakkimizda"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Hakkımızda
              </Link>
              <Link
                href="/iletisim"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                İletişim
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-2">
              <Link
                href="/uye-ol"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Üye Ol
              </Link>
              <Link
                href="/giris-yap"
                className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Giriş Yap
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:bg-blue-700 p-2 rounded-md"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-700">
              <Link
                href="/"
                className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={closeMenu}
              >
                Anasayfa
              </Link>
              <Link
                href="/denemeler"
                className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={closeMenu}
              >
                Denemeler
              </Link>
              <Link
                href="/hakkimizda"
                className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={closeMenu}
              >
                Hakkımızda
              </Link>
              <Link
                href="/iletisim"
                className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={closeMenu}
              >
                İletişim
              </Link>
              <div className="border-t border-blue-600 pt-2 mt-2">
                <Link
                  href="/uye-ol"
                  className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={closeMenu}
                >
                  Üye Ol
                </Link>
                <Link
                  href="/giris-yap"
                  className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={closeMenu}
                >
                  Giriş Yap
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
