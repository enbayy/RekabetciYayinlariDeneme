'use client';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Gizlilik Politikası</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
        </header>

        <section className="space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">1. Kapsam</h2>
            <p>Bu politika, Rekabetçi Yayınları platformu üzerinden toplanan kişisel verilerin işlenme amaçlarını, hukuki dayanakları ve veri güvenliği yöntemlerini açıklar.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">2. Toplanan Veriler</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Hesap bilgileri (ad, soyad, e-posta)</li>
              <li>Hizmet kullanımı sırasında oluşan işlem kayıtları (deneme sonucu, süre vb.)</li>
              <li>Destek taleplerine ilişkin iletişim içerikleri</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">3. Kullanım Amaçları</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Hizmetlerin sağlanması, iyileştirilmesi ve özelleştirilmesi</li>
              <li>Güvenlik, dolandırıcılık önleme ve kötüye kullanımın tespiti</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">4. Saklama Süresi</h2>
            <p>Veriler, amaçlarının gerektirdiği süre boyunca ve ilgili mevzuatın öngördüğü asgari/maksimum süreler dâhilinde saklanır.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">5. Üçüncü Taraflarla Paylaşım</h2>
            <p>Hizmetin sağlanması için gerekli olduğunda sınırlı olarak ve yeterli güvenlik önlemleriyle paylaşım yapılabilir.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">6. Haklarınız</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Erişim, düzeltme, silme, işlemeyi kısıtlama taleplerinde bulunma</li>
              <li>Açık rızaya dayanan işlemlerde rızayı dilediğiniz an geri çekme</li>
              <li>Yetkili otoritelere şikâyette bulunma</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">7. Güvenlik</h2>
            <p>Uygun teknik ve idari tedbirlerle kişisel verilerin güvenliği sağlanır; yetkisiz erişime karşı koruma uygulanır.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">8. İletişim</h2>
            <p>Gizlilikle ilgili talepleriniz için İletişim sayfamız üzerinden bize ulaşabilirsiniz.</p>
          </div>
        </section>
      </div>
    </div>
  );
}



