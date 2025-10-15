'use client';

export default function Blog() {
  const posts = [
    { title: 'TYT Matematikte Zaman Yönetimi', excerpt: 'Sınavda zamanı verimli kullanmak için pratik ipuçları ve 3 adımlı çözüm stratejisi.', date: '2025-01-15', category: 'TYT', tags: ['zaman', 'matematik'] },
    { title: 'AYT Sayısalda Sık Yapılan Hatalar', excerpt: 'En yaygın hataları örneklerle analiz edip nasıl kaçınabileceğinizi anlatıyoruz.', date: '2025-02-01', category: 'AYT', tags: ['sayısal', 'strateji'] },
    { title: 'Paragraf Sorularında Hız ve Doğruluk', excerpt: 'Odaklanma, not alma, seçenek eleme teknikleriyle hız ve doğruluğu artırın.', date: '2025-02-20', category: 'TYT', tags: ['türkçe', 'paragraf'] },
    { title: 'Kimya Denemelerinde Çeldiriciler', excerpt: 'Sık kullanılan çeldirici tipleri ve bunları fark etme yöntemleri.', date: '2025-03-05', category: 'AYT', tags: ['kimya', 'ipuçları'] },
    { title: 'Deneme Analizi Nasıl Yapılır?', excerpt: 'Net/puan dışında konu-kazanım, zaman ve boş/yanlış dağılımına odaklanın.', date: '2025-03-18', category: 'Genel', tags: ['analiz', 'raporlama'] },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((p, i) => (
            <article key={i} className="rounded-2xl border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-800">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm text-slate-500 dark:text-slate-400">{new Date(p.date).toLocaleDateString('tr-TR')}</div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 dark:bg-slate-900 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-slate-700">{p.category}</span>
              </div>
              <h2 className="text-xl font-semibold mb-2">{p.title}</h2>
              <p className="text-slate-700 dark:text-slate-300 mb-3">{p.excerpt}</p>
              {p.tags && (
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t, idx) => (
                    <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">#{t}</span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}


