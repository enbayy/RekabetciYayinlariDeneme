'use client';

export default function Terms() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Kullanım Şartları</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
        </header>

        <section className="space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">1. Tanımlar</h2>
            <p>Bu metinde geçen “Platform”, “Hizmet”, “Kullanıcı” ve “Üye” kavramları Rekabetçi Yayınları çevrimiçi deneme platformunu ve hizmetlerinden yararlanan kişileri ifade eder.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">2. Kullanım Koşulları</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Platform yalnızca yasal amaçlarla ve ilgili mevzuata uygun şekilde kullanılabilir.</li>
              <li>Hesap bilgilerinizin güvenliğinden siz sorumlusunuz; yetkisiz kullanımları derhal bize bildirin.</li>
              <li>İçeriklerin telif hakları saklıdır; izinsiz kopyalama, dağıtma veya ticari kullanım yasaktır.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">3. Ücretlendirme ve İade</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Satın alınan paketlerin kapsamı ve süresi fiyatlandırma sayfasında belirtilir.</li>
              <li>Dijital içeriklerde, yürürlükteki mevzuat gereği iade koşulları sınırlı olabilir.</li>
              <li>Hatalı veya eksik hizmet durumunda destek ekibimizle iletişime geçerek çözüm talep edebilirsiniz.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">4. Hesap ve Güvenlik</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Hesabınızı üçüncü kişilerle paylaşmayın; yetkisiz erişim risklerini artırır.</li>
              <li>Şifre güvenliği için güçlü ve benzersiz parolalar kullanın.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">5. Değişiklik Hakkı</h2>
            <p>Rekabetçi Yayınları, kullanım şartlarını güncelleme hakkını saklı tutar. Güncellemeler bu sayfada yayınlandığı tarihte yürürlüğe girer.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">6. İletişim</h2>
            <p>Her türlü soru ve talep için İletişim sayfamız üzerinden bize ulaşabilirsiniz.</p>
          </div>
        </section>
      </div>
    </div>
  );
}



