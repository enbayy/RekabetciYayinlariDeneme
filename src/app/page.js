"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState(null); // { name: string, price: string }
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100 pt-8 pb-16 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%231D4ED8\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="mb-6">
              <span className="inline-block bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-6 py-3 rounded-full text-sm font-semibold mb-4 shadow-soft border border-blue-200 dark:border-blue-900">
                🎓 Rekabetçi Yayınları
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-display text-slate-900 dark:text-slate-100">
              Deneme
              <span className="block text-blue-700">Platformu</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed text-slate-600 dark:text-slate-300">
              YKS, TYT, AYT ve branş denemeleri ile sınavlara hazırlanın. 
              <span className="text-blue-700 font-semibold"> Gerçek sınav deneyimi</span> yaşayın ve 
              <span className="text-blue-700 font-semibold"> performansınızı ölçün</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link
                href="/denemeler"
                className="bg-blue-700 hover:bg-blue-800 text-white px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-medium hover:shadow-strong"
              >
                🚀 Denemelere Başla
              </Link>
              <Link
                href="/hakkimizda"
                className="border-2 border-blue-700 text-blue-700 dark:border-blue-500 dark:text-blue-300 px-12 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 dark:hover:bg-slate-800 hover:border-blue-800 transition-all duration-300 transform hover:scale-105"
              >
                📚 Daha Fazla Bilgi
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-medium border border-slate-200 dark:border-slate-700 hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl md:text-5xl font-bold text-blue-700 mb-3">1000+</div>
                <div className="text-slate-600 font-semibold text-lg">Aktif Öğrenci</div>
              </div>
              <div className="text-center bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-medium border border-slate-200 dark:border-slate-700 hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl md:text-5xl font-bold text-blue-700 mb-3">500+</div>
                <div className="text-slate-600 font-semibold text-lg">Deneme Sınavı</div>
              </div>
              <div className="text-center bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-medium border border-slate-200 dark:border-slate-700 hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl md:text-5xl font-bold text-blue-700 mb-3">50+</div>
                <div className="text-slate-600 font-semibold text-lg">Uzman Eğitmen</div>
              </div>
              <div className="text-center bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-medium border border-slate-200 dark:border-slate-700 hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl md:text-5xl font-bold text-blue-700 mb-3">95%</div>
                <div className="text-slate-600 font-semibold text-lg">Memnuniyet</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4 font-display">
              Neden Rekabetçi Yayınları?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              En kaliteli deneme sınavları ve detaylı analizlerle sınavlara hazırlanın. 
              <span className="text-blue-700 font-semibold">Teknoloji</span> ile 
              <span className="text-blue-700 font-semibold">eğitimi</span> birleştiriyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-950 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-slate-100">Kaliteli Sorular</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Uzman eğitimciler tarafından hazırlanmış, güncel ve kaliteli sorular.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-950 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-slate-100">Gerçek Sınav</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Gerçek sınav koşullarında deneme yapın ve zaman yönetiminizi geliştirin.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-950 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-slate-100">Detaylı Analiz</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Performansınızı detaylı analiz edin ve gelişim alanlarınızı keşfedin.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-950 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-slate-100">Hızlı Sonuç</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Anında sonuçlar ve detaylı raporlarla performansınızı takip edin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gray-50 dark:bg-slate-950 relative">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,#1d4ed8_0,transparent_30%),radial-gradient(circle_at_80%_30%,#7c3aed_0,transparent_30%)]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-slate-900 px-4 py-1.5 text-sm font-semibold text-blue-700 dark:text-slate-300 border border-blue-100 dark:border-slate-700 mb-5">Nasıl Çalışır?</div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-4">
              3 Adımda Başlayın
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">
              Sadece üç basit adım ile deneme sınavlarına başlayın ve gelişiminizi takip edin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="h-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-lg shadow">
                      1
                    </div>
                    <span className="absolute -right-1 -bottom-1 w-4 h-4 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700"></span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100">Üye Ol</h3>
                </div>
                <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                  Ücretsiz hesap oluşturun ve profil bilgilerinizi tamamlayın. Sadece birkaç dakika sürer.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="h-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-lg shadow">
                      2
                    </div>
                    <span className="absolute -right-1 -bottom-1 w-4 h-4 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700"></span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100">Deneme Seç</h3>
                </div>
                <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                  TYT, AYT veya branş denemelerinden birini seçin. Size uygun olanı bulun ve başlayın.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="h-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-lg shadow">
                      3
                    </div>
                    <span className="absolute -right-1 -bottom-1 w-4 h-4 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700"></span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100">Analiz Et</h3>
                </div>
                <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                  Sonuçlarınızı detaylı analiz edin ve gelişim alanlarınızı keşfedin. Bir sonraki adımınızı planlayın.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-6">
              Öğrenci Yorumları
            </h2>
            <p className="text-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">
              Başarılı öğrencilerimizin deneyimlerini okuyun
            </p>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 border border-transparent dark:border-slate-700 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-slate-100">Ahmet Yılmaz</h4>
                  <p className="text-gray-600 dark:text-slate-300">TYT Öğrencisi</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-slate-300 italic">
                "Bu platform sayesinde TYT'de 50 puan artırdım. 
                Gerçek sınav deneyimi yaşamak çok faydalı oldu."
              </p>
              <div className="flex text-yellow-400 mt-4 mt-auto">
                ⭐⭐⭐⭐⭐
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 border border-transparent dark:border-slate-700 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  E
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-slate-100">Elif Kaya</h4>
                  <p className="text-gray-600 dark:text-slate-300">AYT Öğrencisi</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-slate-300 italic">
                "Detaylı analizler sayesinde eksik konularımı fark ettim. 
                Çok profesyonel bir platform."
              </p>
              <div className="flex text-yellow-400 mt-4 mt-auto">
                ⭐⭐⭐⭐⭐
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 border border-transparent dark:border-slate-700 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-slate-100">Mehmet Demir</h4>
                  <p className="text-gray-600 dark:text-slate-300">Branş Öğrencisi</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-slate-300 italic">
                "Matematik branş denemeleri çok kaliteli. 
                Zaman yönetimimi geliştirdim."
              </p>
              <div className="flex text-yellow-400 mt-4 mt-auto">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-blue-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-6">
              Fiyatlandırma
            </h2>
            <p className="text-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">
              Her bütçeye uygun paketlerimizle başarınızı destekliyoruz
            </p>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Başlangıç Paketi */}
              <div className={`bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border-2 ${selectedPlan?.name === 'Başlangıç' ? 'border-blue-600' : 'border-slate-200 dark:border-slate-700'} flex flex-col h-full`}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-1">Başlangıç</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">Yeni başlayanlar için temel içerikler</p>
                <div className="text-4xl font-bold text-blue-600 mb-6">₺19<span className="text-lg text-gray-600 dark:text-slate-300">/ay</span></div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center"><span className="text-green-500 mr-3">✓</span><span>Ayda 20 deneme</span></li>
                  <li className="flex items-center"><span className="text-green-500 mr-3">✓</span><span>Temel analiz</span></li>
                  <li className="flex items-center"><span className="text-green-500 mr-3">✓</span><span>E-posta desteği</span></li>
                </ul>
                <button
                  onClick={() => setSelectedPlan({ name: 'Başlangıç', price: '19' })}
                  className={`mt-auto w-full font-semibold py-3 px-6 rounded-lg transition-colors text-center block ${selectedPlan?.name === 'Başlangıç' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-600 hover:bg-gray-700 text-white'}`}
                >
                  Seç
                </button>
              </div>

              {/* Premium Paketi */}
              <div className={`bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border-2 relative ${selectedPlan?.name === 'Premium' ? 'border-blue-600' : 'border-slate-200 dark:border-slate-700'} flex flex-col h-full`}>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">En Popüler</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-1">Premium</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">Sınırsız erişim ve ileri analizler</p>
                <div className="text-4xl font-bold text-blue-600 mb-6">₺29<span className="text-lg text-gray-600 dark:text-slate-300">/ay</span></div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center"><span className="text-green-500 mr-3">✓</span><span>Sınırsız deneme</span></li>
                  <li className="flex items-center"><span className="text-green-500 mr-3">✓</span><span>Detaylı analiz</span></li>
                  <li className="flex items-center"><span className="text-green-500 mr-3">✓</span><span>Öncelikli destek</span></li>
                  <li className="flex items-center"><span className="text-green-500 mr-3">✓</span><span>Mobil uygulama</span></li>
                </ul>
                <button
                  onClick={() => setSelectedPlan({ name: 'Premium', price: '29' })}
                  className={`mt-auto w-full font-semibold py-3 px-6 rounded-lg transition-colors text-center block ${selectedPlan?.name === 'Premium' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-600 hover:bg-gray-700 text-white'}`}
                >
                  Seç
                </button>
              </div>

              {/* Pro Paketi (Kurumsal yerine) */}
              <div className={`bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border-2 ${selectedPlan?.name === 'Pro' ? 'border-blue-600' : 'border-slate-200 dark:border-slate-700'} flex flex-col h-full`}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-1">Pro</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">Yoğun pilotaj ve derin raporlama</p>
                <div className="text-4xl font-bold text-blue-600 mb-6">₺49<span className="text-lg text-gray-600 dark:text-slate-300">/ay</span></div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center"><span className="text-green-500 mr-3">✓</span><span>Özel denemeler</span></li>
                  <li className="flex items-center"><span className="text-green-500 mr-3">✓</span><span>Gelişmiş raporlama</span></li>
                  <li className="flex items-center"><span className="text-green-500 mr-3">✓</span><span>7/24 destek</span></li>
                  <li className="flex items-center"><span className="text-green-500 mr-3">✓</span><span>API entegrasyonu</span></li>
                </ul>
                <button
                  onClick={() => setSelectedPlan({ name: 'Pro', price: '49' })}
                  className={`mt-auto w-full font-semibold py-3 px-6 rounded-lg transition-colors text-center block ${selectedPlan?.name === 'Pro' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-600 hover:bg-gray-700 text-white'}`}
                >
                  Seç
                </button>
              </div>
            </div>

            {/* Ödeme CTA */}
            <div className="mt-8 text-center">
              <Link
                href={selectedPlan ? { pathname: '/odeme', query: { plan: selectedPlan.name, price: selectedPlan.price } } : '#'}
                className={`inline-block px-10 py-4 rounded-xl font-bold transition-colors ${selectedPlan ? 'bg-blue-700 hover:bg-blue-800 text-white' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}
                aria-disabled={!selectedPlan}
              >
                Ödemeye Geç
              </Link>
              {!selectedPlan && (
                <p className="mt-3 text-sm text-slate-500">Lütfen önce bir paket seçin.</p>
              )}
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Hemen Başlayın!
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
            Ücretsiz hesap oluşturun ve deneme sınavlarına başlayın. 
            <span className="text-blue-200 font-semibold"> Başarınız</span> için 
            <span className="text-blue-200 font-semibold"> bugün</span> harekete geçin!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/uye-ol"
              className="bg-white text-blue-600 px-12 py-4 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🚀 Ücretsiz Üye Ol
            </Link>
            <Link
              href="/denemeler"
              className="border-2 border-white text-white px-12 py-4 rounded-xl font-bold text-xl hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              📚 Denemeleri İncele
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
