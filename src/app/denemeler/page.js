'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase';
import { useToast } from '@/components/ToastProvider';

export default function Denemeler() {
  const [selectedCategory, setSelectedCategory] = useState('tyt');
  const router = useRouter();
  const { addToast } = useToast();

  const categories = [
    { id: 'tyt', name: 'TYT Denemeleri' },
    { id: 'ayt', name: 'AYT Denemeleri' },
    { id: 'branş', name: 'Branş Denemeleri' },
  ];

  const denemePaketleri = {
    tyt: [
      { id: 1, title: 'TYT Genel Deneme Paketi', description: 'Temel Yeterlilik Testi için kapsamlı deneme paketi', questionCount: 120, duration: 135, price: 29.99, difficulty: 'Orta', subjects: ['Türkçe', 'Matematik', 'Fen Bilimleri', 'Sosyal Bilimler'] },
      { id: 2, title: 'TYT Matematik Odaklı', description: 'Matematik ağırlıklı TYT deneme paketi', questionCount: 120, duration: 135, price: 24.99, difficulty: 'Zor', subjects: ['Matematik', 'Geometri', 'Türkçe', 'Fen Bilimleri'] },
      { id: 3, title: 'TYT Hızlandırılmış', description: 'Hızlı çözüm teknikleri ile TYT denemeleri', questionCount: 120, duration: 120, price: 19.99, difficulty: 'Kolay', subjects: ['Türkçe', 'Matematik', 'Fen Bilimleri', 'Sosyal Bilimler'] },
      { id: 10, title: 'TYT Ücretsiz Deneme', description: 'Platformu denemek için ücretsiz deneme', questionCount: 40, duration: 50, price: 0, difficulty: 'Kolay', subjects: ['Türkçe', 'Matematik'] }
    ],
    ayt: [
      { id: 4, title: 'AYT Sayısal Deneme Paketi', description: 'Sayısal öğrenciler için özel AYT deneme paketi', questionCount: 160, duration: 180, price: 39.99, difficulty: 'Zor', subjects: ['Matematik', 'Fizik', 'Kimya', 'Biyoloji'] },
      { id: 5, title: 'AYT Eşit Ağırlık Paketi', description: 'Eşit ağırlık öğrencileri için AYT denemeleri', questionCount: 160, duration: 180, price: 39.99, difficulty: 'Orta', subjects: ['Matematik', 'Türk Dili ve Edebiyatı', 'Tarih', 'Coğrafya'] },
      { id: 6, title: 'AYT Sözel Paketi', description: 'Sözel öğrenciler için kapsamlı AYT denemeleri', questionCount: 160, duration: 180, price: 39.99, difficulty: 'Orta', subjects: ['Türk Dili ve Edebiyatı', 'Tarih', 'Coğrafya', 'Felsefe'] }
    ],
    branş: [
      { id: 11, title: 'Ücretsiz Türkçe Branş Denemesi', description: 'Türkçe için ücretsiz deneme', questionCount: 3, duration: 60, price: 0, difficulty: 'Kolay', subjects: ['Türkçe'] },
      { id: 12, title: 'Ücretsiz Matematik Branş Denemesi', description: 'Matematik için ücretsiz deneme', questionCount: 3, duration: 60, price: 0, difficulty: 'Kolay', subjects: ['Matematik'] },
      { id: 13, title: 'Ücretsiz Fen Branş Denemesi', description: 'Fen Bilimleri için ücretsiz deneme', questionCount: 3, duration: 60, price: 0, difficulty: 'Kolay', subjects: ['Fen Bilimleri'] },
      { id: 7, title: 'Matematik Branş Denemeleri', description: 'Sadece matematik sorularından oluşan deneme paketi', questionCount: 40, duration: 60, price: 14.99, difficulty: 'Orta', subjects: ['Matematik', 'Geometri'] },
      { id: 8, title: 'Fizik Branş Denemeleri', description: 'Fizik konularına odaklanmış deneme paketi', questionCount: 40, duration: 60, price: 14.99, difficulty: 'Zor', subjects: ['Fizik'] },
      { id: 9, title: 'Türkçe Branş Denemeleri', description: 'Türkçe dil bilgisi ve anlam bilgisi denemeleri', questionCount: 40, duration: 60, price: 14.99, difficulty: 'Orta', subjects: ['Türkçe'] }
    ]
  };

  const handleStartClick = (denemeId) => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      router.push('/giris-yap');
      return;
    }

    if (!currentUser.emailVerified) {
      addToast("E-posta doğrulanmamış. Lütfen doğrulayın.", "error");
      return;
    }

    router.push(`/deneme/${denemeId}`);
  };

  const handleBuyClick = (deneme) => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      router.push('/giris-yap');
      return;
    }

    if (!currentUser.emailVerified) {
      addToast("E-posta doğrulanmamış. Lütfen doğrulayın.", "error");
      return;
    }

    router.push(`/odeme?plan=${encodeURIComponent(deneme.title)}&price=${encodeURIComponent(deneme.price)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 py-8 text-neutral-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <span className="inline-block bg-primary-100 dark:bg-blue-950 text-primary-700 dark:text-blue-300 px-6 py-3 rounded-full text-sm font-semibold mb-4 shadow-soft">
              🎯 Rekabetçi Yayınları
            </span>
          </div>
          <h1 className="text-5xl font-bold text-neutral-900 dark:text-slate-100 mb-6 font-display">
            Deneme Sınavları
          </h1>
          <p className="text-xl text-neutral-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            YKS hazırlığınız için kaliteli deneme sınavları. 
            <span className="text-primary-600 font-semibold"> Gerçek sınav deneyimi </span> yaşayın ve 
            <span className="text-primary-600 font-semibold"> performansınızı ölçün.</span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-medium p-6 border border-neutral-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold mb-6 text-neutral-900 dark:text-slate-100 font-display">
                📚 Deneme Kategorileri
              </h2>
              <div className="space-y-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-primary-600 text-white shadow-medium'
                        : 'text-neutral-700 dark:text-slate-200 hover:bg-neutral-50 dark:hover:bg-slate-700 hover:text-neutral-900 dark:hover:text-slate-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-slate-100 mb-2">
                {categories.find(cat => cat.id === selectedCategory)?.name}
              </h2>
              <p className="text-gray-600 dark:text-slate-300">
                {selectedCategory === 'tyt' && 'Temel Yeterlilik Testi deneme sınavları'}
                {selectedCategory === 'ayt' && 'Alan Yeterlilik Testi deneme sınavları'}
                {selectedCategory === 'branş' && 'Branş bazlı deneme sınavları'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {denemePaketleri[selectedCategory].map((deneme) => (
                <div key={deneme.id} className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700 overflow-hidden h-full flex flex-col">
                  <div className={`absolute inset-x-0 top-0 h-1 ${
                    deneme.difficulty === 'Kolay'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                      : deneme.difficulty === 'Orta'
                      ? 'bg-gradient-to-r from-yellow-400 to-amber-500'
                      : 'bg-gradient-to-r from-red-500 to-rose-600'
                  }`} />
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
                        {deneme.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold tracking-wide ${
                        deneme.difficulty === 'Kolay' ? 'bg-green-100 text-green-800' :
                        deneme.difficulty === 'Orta' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {deneme.difficulty}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-slate-300 mb-5 leading-relaxed">
                      {deneme.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-5">
                      <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-3 bg-slate-50/60 dark:bg-slate-900/40 flex flex-col items-center justify-center text-center">
                        <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">Soru</div>
                        <div className="text-2xl font-extrabold text-blue-600">{deneme.questionCount}</div>
                      </div>
                      <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-3 bg-slate-50/60 dark:bg-slate-900/40 flex flex-col items-center justify-center text-center">
                        <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">Süre</div>
                        <div className="text-2xl font-extrabold text-blue-600">{deneme.duration}</div>
                        <div className="text-xs text-slate-500">Dakika</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-slate-100 mb-2">Konular</h4>
                      <div className="flex flex-wrap gap-2">
                        {deneme.subjects.map((subject, index) => (
                          <span
                            key={index}
                            className="px-2.5 py-1 bg-blue-50 dark:bg-slate-900/50 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-slate-700 text-xs rounded-full"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4">
                      <div className="text-2xl font-extrabold text-gray-900 dark:text-slate-100">
                        {deneme.price === 0 ? 'Ücretsiz' : `₺${deneme.price}`}
                      </div>
                      <button
                        onClick={() => deneme.price === 0 ? handleStartClick(deneme.id) : handleBuyClick(deneme)}
                        className={`inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-semibold transition-all shadow-sm hover:shadow-md active:scale-[0.99] ${
                          deneme.price === 0
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {deneme.price === 0 ? 'Ücretsiz Başla' : 'Satın Al'}
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
