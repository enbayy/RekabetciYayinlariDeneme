'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12 text-slate-600 dark:text-slate-300">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand + Newsletter */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/rbylogo2.png" alt="Rekabetçi Yayınları" className="h-9 w-auto block dark:hidden" />
              <img src="/rbylogo.png" alt="Rekabetçi Yayınları" className="h-9 w-auto hidden dark:block" />
              <span className="font-semibold text-slate-900 dark:text-slate-100">Rekabetçi Yayınları</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              YKS, TYT, AYT ve branş denemeleri ile gerçek sınav deneyimi, detaylı analiz ve gelişim takibi.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-4">
              <label htmlFor="newsletter" className="text-xs block mb-2">Güncellemeleri alın</label>
              <div className="flex items-stretch gap-2">
                <input
                  id="newsletter"
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="flex-1 px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm">Abone Ol</button>
              </div>
            </form>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 tracking-wide mb-4">Kurumsal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/hakkimizda" className="hover:text-blue-600">Hakkımızda</Link></li>
              <li><Link href="/iletisim" className="hover:text-blue-600">İletişim</Link></li>
              <li><Link href="/denemeler" className="hover:text-blue-600">Denemeler</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 tracking-wide mb-4">Kaynaklar</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-blue-600">Blog (yakında)</Link></li>
              <li><Link href="/" className="hover:text-blue-600">Sık Sorulanlar</Link></li>
              <li><Link href="/" className="hover:text-blue-600">Kılavuzlar</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 tracking-wide mb-4">Yasal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/kullanim-sartlari" className="hover:text-blue-600">Kullanım Şartları</Link></li>
              <li><Link href="/gizlilik-politikasi" className="hover:text-blue-600">Gizlilik Politikası</Link></li>
              <li><Link href="/" className="hover:text-blue-600">Çerezler</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-700 pt-6">
          <p className="text-xs text-slate-500 dark:text-slate-400">© {new Date().getFullYear()} Rekabetçi Yayınları. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-3">
            <a href="https://twitter.com" aria-label="Twitter" className="p-2 rounded-md hover:bg-blue-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 0 0 1.87-2.36 8.46 8.46 0 0 1-2.7 1.04 4.23 4.23 0 0 0-7.21 3.86A12 12 0 0 1 3.15 4.9a4.23 4.23 0 0 0 1.31 5.65 4.2 4.2 0 0 1-1.92-.53v.05a4.23 4.23 0 0 0 3.39 4.14 4.25 4.25 0 0 1-1.91.07 4.23 4.23 0 0 0 3.95 2.94A8.48 8.48 0 0 1 2 19.54a12 12 0 0 0 6.49 1.9c7.79 0 12.06-6.45 12.06-12.04 0-.18-.01-.35-.02-.53A8.6 8.6 0 0 0 24 5.5a8.4 8.4 0 0 1-2.54.7z"/></svg>
            </a>
            <a href="https://facebook.com" aria-label="Facebook" className="p-2 rounded-md hover:bg-blue-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.676V1.325C24 .597 23.403 0 22.675 0z"/></svg>
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="p-2 rounded-md hover:bg-blue-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.403a4.92 4.92 0 0 1 1.78 1.153 4.92 4.92 0 0 1 1.153 1.78c.163.46.347 1.26.403 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.403 2.43a4.92 4.92 0 0 1-1.153 1.78 4.92 4.92 0 0 1-1.78 1.153c-.46.163-1.26.347-2.43.403-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.403a4.92 4.92 0 0 1-1.78-1.153 4.92 4.92 0 0 1-1.153-1.78c-.163-.46-.347-1.26-.403-2.43C2.175 15.584 2.163 15.2 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.97.403-2.43a4.92 4.92 0 0 1 1.153-1.78 4.92 4.92 0 0 1 1.78-1.153c.46-.163 1.26-.347 2.43-.403C8.416 2.175 8.8 2.163 12 2.163zm0 1.622c-3.15 0-3.522.012-4.76.069-1.02.047-1.573.216-1.94.36-.49.19-.84.417-1.207.784a3.3 3.3 0 0 0-.784 1.207c-.144.367-.313.92-.36 1.94-.057 1.238-.069 1.61-.069 4.76s.012 3.522.069 4.76c.047 1.02.216 1.573.36 1.94.19.49.417.84.784 1.207.367.367.717.594 1.207.784.367.144.92.313 1.94.36 1.238.057 1.61.069 4.76.069s3.522-.012 4.76-.069c1.02-.047 1.573-.216 1.94-.36.49-.19.84-.417 1.207-.784.367-.367.594-.717 1.207-.784.367-.144.92-.313 1.94-.36 1.238-.057 1.61-.069 4.76-.069s3.522.012 4.76.069c1.02.047 1.573.216 1.94.36.49.19.84.417 1.207.784.367.367.717.594 1.207.784.367.144.92.313 1.94.36 1.238.057 1.61.069 4.76.069s3.522-.012 4.76-.069c1.02-.047 1.573-.216 1.94-.36.49-.19.84-.417 1.207-.784.367-.367.717-.594 1.207-.784.367-.144.92-.313 1.94-.36 1.238-.057 1.61-.069 4.76-.069zM12 5.838A6.162 6.162 0 1 0 18.162 12 6.168 6.168 0 0 0 12 5.838zm0 10.162A4 4 0 1 1 16 12a4.005 4.005 0 0 1-4 4zm6.406-10.845a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


