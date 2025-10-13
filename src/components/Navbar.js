'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const hasDarkClass = document.documentElement.classList.contains('dark');
      setIsDark(hasDarkClass);
    } catch (_) {}
  }, []);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function toggleTheme() {
    try {
      const root = document.documentElement;
      const nextIsDark = !root.classList.contains('dark');
      if (nextIsDark) {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      setIsDark(nextIsDark);
    } catch (_) {}
  }

  const navLinks = [
    { href: '/', label: 'Anasayfa' },
    { href: '/denemeler', label: 'Denemeler' },
    { href: '/hakkimizda', label: 'Hakkımızda' },
    { href: '/iletisim', label: 'İletişim' },
  ];

  return (
    <>
      <nav className="fixed top-2 left-1/2 transform -translate-x-1/2 w-[95%] lg:w-[90%] bg-white/95 dark:bg-slate-900/90 backdrop-blur-md shadow-md border-b border-slate-200 dark:border-slate-700 rounded-xl z-50 transition-all">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-2 flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="/rbylogo.png"
                  alt="Logo light"
                  className="h-14 w-auto rounded-lg block dark:hidden"
                />
                <img
                  src="/rbylogo2.png"
                  alt="Logo dark"
                  className="h-14 w-auto rounded-lg hidden dark:block"
                />
              </div>
              <span className="hidden sm:block text-slate-900 dark:text-slate-100 text-lg font-bold font-display">
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
                className="text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3 ml-4">
            <button
              onClick={toggleTheme}
              aria-label="Tema değiştir"
              className="flex items-center justify-center rounded-lg px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all"
            >
              {isDark ? (
                // Sun icon when dark
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                // Moon icon when light
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            <Link
              href="/uye-ol"
              className="text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
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

          {/* Mobile actions: theme toggle + menu button */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={toggleTheme}
              aria-label="Tema değiştir (mobil)"
              className="text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 p-2 rounded-md"
            >
              {isDark ? (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 p-2 rounded-md"
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
          <div className="md:hidden px-4 py-3 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-700 flex flex-col gap-2 rounded-b-xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 block px-4 py-2 rounded-lg text-base font-medium transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <button
                onClick={() => { toggleTheme(); closeMenu(); }}
                className="text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 block px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 text-left"
              >
                {isDark ? 'Aydınlık moda geç' : 'Karanlık moda geç'}
              </button>
              <Link
                href="/uye-ol"
                onClick={closeMenu}
                className="text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 block px-4 py-2 rounded-lg text-base font-medium transition-all duration-200"
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
      <div className="h-[68px] bg-white dark:bg-slate-900"></div>
    </>
  );
}
