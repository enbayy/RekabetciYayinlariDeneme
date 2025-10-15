'use client';

export default function FAQ() {
  const faqs = [
    {
      q: 'Platforma nasıl üye olurum?',
      a: 'Ana sayfadaki Üye Ol bağlantısından adım adım ilerleyerek ücretsiz hesabınızı oluşturabilirsiniz. E-posta doğrulamasını tamamlamayı unutmayın.'
    },
    {
      q: 'Denemeler gerçek sınav formatında mı?',
      a: 'TYT/AYT ve branş denemeleri gerçek sınav süreleri ve soru dağılımlarına uygun şekilde hazırlanmıştır.'
    },
    {
      q: 'Ücretsiz deneme var mı?',
      a: 'Evet. Denemeler sayfasında listelenen “Ücretsiz” etiketli paketi seçerek hemen başlayabilirsiniz.'
    },
    {
      q: 'Sonuçlarımı nasıl analiz edebilirim?',
      a: 'Deneme bitince sistem net/puan ve konu-kazanım bazlı performansınızı gösterir. Zayıf alanlarınıza göre çalışma önerileri sunulur.'
    },
    {
      q: 'Ödeme ve iade koşulları nelerdir?',
      a: 'Dijital içerik olduğundan iade koşulları mevzuata tabidir. Hatalı/eksik hizmet durumunda destek ekibiyle iletişime geçebilirsiniz.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Sık Sorulan Sorular</h1>

        <div className="divide-y divide-slate-200 dark:divide-slate-700 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          {faqs.map((item, idx) => (
            <div key={idx} className="p-6">
              <h2 className="text-lg font-semibold mb-2">{item.q}</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


