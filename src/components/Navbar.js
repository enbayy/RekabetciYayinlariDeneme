'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { auth } from '@/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { FiUser } from 'react-icons/fi';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState(null);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  useEffect(() => {
    try {
      const hasDarkClass = document.documentElement.classList.contains('dark');
      setIsDark(hasDarkClass);
    } catch (_) {}

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.emailVerified) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      addToast('Çıkış yapıldı.', 'success');
      setUser(null);
    } catch (err) {
      console.error('Sign out error:', err);
      addToast('Çıkış yapılırken bir hata oluştu.', 'error');
    }
  };

  const navLinks = [
    { href: '/', label: 'Anasayfa' },
    { href: '/denemeler', label: 'Denemeler' },
    { href: '/hakkimizda', label: 'Hakkımızda' },
    { href: '/iletisim', label: 'İletişim' },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-2 inset-x-2 md:inset-x-auto md:left-1/2 md:transform md:-translate-x-1/2 md:w-[95%] lg:w-[90%] bg-white/95 dark:bg-slate-900/90 backdrop-blur-md shadow-md border-b border-slate-200 dark:border-slate-700 rounded-xl z-50 transition-all">
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

          {/* Desktop Menü */}
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

          {/* Sağ taraf (tema + auth) */}
          <div className="hidden md:flex items-center gap-3 ml-4">
            <button
              onClick={toggleTheme}
              aria-label="Tema değiştir"
              className="flex items-center justify-center rounded-lg px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all"
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

            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={closeMenu}
                  className="bg-transparent text-black dark:text-white flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  <FiUser className="h-5 w-5" />
                </Link>
                <button
                  onClick={handleSignOut}
                  className="bg-red-600 text-white hover:bg-red-700 px-4 py-1 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/uye-ol"
                  className="text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  Üye Ol
                </Link>
                <Link
                  href="/giris-yap"
                  className="bg-blue-700 text-white hover:bg-blue-800 px-4 py-1 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md"
                >
                  Giriş Yap
                </Link>
              </>
            )}
          </div>

          {/* Mobil Menü Butonları */}
          <div className="md:hidden flex items-center gap-1">
            <button onClick={toggleTheme} className="text-slate-700 dark:text-slate-200 p-2">
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
            <button onClick={toggleMenu} className="text-slate-700 dark:text-slate-200 p-2 text-xl font-bold">
              {isMenuOpen ? '✖️' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobil Menü */}
        {isMenuOpen && (
  <div className="md:hidden px-2 py-2 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-700 flex flex-col gap-2 rounded-b-xl">
    {navLinks.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        onClick={closeMenu}
        className="w-full text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-center"
      >
        {link.label}
      </Link>
    ))}

    <div className="mt-2 flex flex-col gap-2 items-center">
      {user ? (
        <>
          <Link
            href="/profile"
            onClick={closeMenu}
            className="bg-blue-800 hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
          >
            <FiUser className="h-4 w-4" />
            Profil
          </Link>
          <button
            onClick={() => { handleSignOut(); closeMenu(); }}
            className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
          >
            Çıkış Yap
          </button>
        </>
      ) : (
        <>
          <Link
            href="/uye-ol"
            onClick={closeMenu}
            className="w-full text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-center"
          >
            Üye Ol
          </Link>
          <Link
            href="/giris-yap"
            onClick={closeMenu}
            className="w-full bg-blue-700 text-white hover:bg-blue-800 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 text-center"
          >
            Giriş Yap
          </Link>
        </>
      )}
    </div>
  </div>
)}

      </nav>

      {/* Navbar yüksekliği kadar boşluk */}
      <div className="h-[68px] bg-white dark:bg-slate-900"></div>

      {/* Toast Bildirimleri */}
      <div className="fixed top-5 right-5 flex flex-col gap-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-2 rounded-lg shadow-md text-white transition-all duration-300 ${
              toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } animate-fadeIn`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </>
  );
}
