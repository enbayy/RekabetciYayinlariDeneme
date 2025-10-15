'use client';

export default function Guides() {
  const guides = [
    { title: 'TYT Başlangıç Kılavuzu', desc: 'Konulara giriş, kaynak önerileri, 8 haftalık örnek çalışma planı ve günlük rutin.' },
    { title: 'AYT Strateji Rehberi', desc: 'Konuları ağırlıklandırma, deneme takvimi ve sınav haftası stratejileri.' },
    { title: 'Branş Denemeleri Nasıl Çözülür?', desc: 'Branş bazlı denemelerde hedef süre, soru sırası ve analiz metodu.' },
    { title: 'Deneme Sonrası Analiz Şablonu', desc: 'Net/puan, zaman, konu-kazanım ve hata türlerine göre değerlendirme şablonu.' },
    { title: 'Zaman Yönetimi Teknikleri', desc: 'Pomodoro, blok çalışma, mola aralıkları ve hızlı tekrar taktikleri.' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Kılavuzlar</h1>
        <div className="space-y-4">
          {guides.map((g, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-800">
              <h2 className="text-xl font-semibold mb-2">{g.title}</h2>
              <p className="text-slate-700 dark:text-slate-300 mb-3">{g.desc}</p>
              <div className="text-sm text-slate-500 dark:text-slate-400">Yakında ayrıntılı rehber sayfası eklenecek.</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


