'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Odeme() {
  const params = useSearchParams();
  const plan = params.get('plan') || 'Seçili Paket';
  const price = params.get('price') || '29,99';
  const now = new Date();
  const currentYear = now.getFullYear();
  const years = Array.from({ length: 12 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">Ödeme</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Satın alma işlemini tamamlamak için gerekli bilgileri doldurun.</p>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow p-6">
          {/* Sipariş Özeti */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Paket</div>
              <div className="text-lg font-semibold">{plan}</div>
            </div>
            <div className="text-lg font-bold">₺{price}</div>
          </div>

          <form className="grid grid-cols-1 gap-6">
            {/* Kart Sahibi */}
            <div>
              <label className="block text-sm font-medium mb-2">Ad Soyad</label>
              <input required className="w-full px-3 py-3 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700" placeholder="Ad Soyad" />
            </div>

            {/* Kart Bilgileri */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Kart Üzerindeki İsim</label>
                <input required className="w-full px-3 py-3 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700" placeholder="Ad Soyad" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Kart Numarası</label>
                <input required inputMode="numeric" maxLength={19} className="w-full px-3 py-3 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Ay</label>
                  <select required className="w-full px-3 py-3 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700" defaultValue="">
                    <option value="" disabled>Ay</option>
                    {months.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Yıl</label>
                  <select required className="w-full px-3 py-3 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700" defaultValue="">
                    <option value="" disabled>Yıl</option>
                    {years.map(y => (
                      <option key={y} value={String(y).slice(2)}>{String(y).slice(2)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CVC</label>
                  <input required inputMode="numeric" maxLength={4} className="w-full px-3 py-3 border rounded-lg bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700" placeholder="123" />
                </div>
              </div>
            </div>
            {/* Opsiyonel fatura alanları kaldırıldı */}

            <label className="flex items-start gap-3 text-sm">
              <input required type="checkbox" className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <span>
                Satın alma koşullarını ve <Link href="/kullanim-sartlari" className="text-blue-600 hover:underline">kullanım şartlarını</Link> kabul ediyorum.
              </span>
            </label>

            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-500">Güvenli ödeme • Kart bilgileriniz şifrelenir</div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">Ödemeyi Tamamla</button>
            </div>

            <div className="text-center">
              <Link href="/denemeler" className="text-blue-600 hover:underline">← Denemelere geri dön</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


