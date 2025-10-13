export default function Hakkimizda() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8 text-gray-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">
            Hakkımızda
          </h1>
          <p className="text-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">
            Eğitimde kaliteyi ve başarıyı destekleyen, öğrencilerin potansiyellerini 
            ortaya çıkarmalarına yardımcı olan bir platformuz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-slate-100 mb-6">
              Misyonumuz
            </h2>
            <p className="text-gray-600 dark:text-slate-300 text-lg leading-relaxed mb-6">
              Öğrencilerin akademik başarılarını artırmak ve sınavlara en iyi şekilde 
              hazırlanmalarını sağlamak için kaliteli deneme sınavları sunuyoruz. 
              Teknoloji ile eğitimi birleştirerek, öğrencilerin potansiyellerini 
              ortaya çıkarmalarına yardımcı oluyoruz.
            </p>
            <p className="text-gray-600 dark:text-slate-300 text-lg leading-relaxed">
              Her öğrencinin farklı öğrenme stiline sahip olduğunu biliyoruz ve 
              bu nedenle kişiselleştirilmiş analizler ve detaylı geri bildirimler 
              sunuyoruz.
            </p>
          </div>
          
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-slate-100 mb-6">
              Vizyonumuz
            </h2>
            <p className="text-gray-600 dark:text-slate-300 text-lg leading-relaxed mb-6">
              Türkiye'nin en kapsamlı ve etkili online deneme sınav platformu 
              olmak istiyoruz. Eğitimde teknoloji kullanımını yaygınlaştırarak, 
              öğrencilerin başarı oranlarını artırmayı hedefliyoruz.
            </p>
            <p className="text-gray-600 dark:text-slate-300 text-lg leading-relaxed">
              Sürekli gelişen içeriklerimiz ve yenilikçi yaklaşımımızla, 
              eğitim sektöründe öncü olmaya devam edeceğiz.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 mb-16 border border-transparent dark:border-slate-700">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-slate-100 mb-8 text-center">
            Değerlerimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-950 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Kalite</h3>
              <p className="text-gray-600 dark:text-slate-300">
                En yüksek kalitede içerik ve hizmet sunmayı taahhüt ediyoruz.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-950 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">İnovasyon</h3>
              <p className="text-gray-600 dark:text-slate-300">
                Sürekli gelişim ve yenilikçi çözümlerle öncü olmaya çalışıyoruz.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-950 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Öğrenci Odaklılık</h3>
              <p className="text-gray-600 dark:text-slate-300">
                Her kararımızda öğrencilerin başarısını ön planda tutuyoruz.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-slate-800 rounded-lg p-8 text-center border border-transparent dark:border-slate-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-slate-100 mb-4">
            Ekibimiz
          </h2>
          <p className="text-gray-600 dark:text-slate-300 text-lg mb-6">
            Alanında uzman eğitimciler, yazılım geliştiriciler ve eğitim teknolojileri 
            uzmanlarından oluşan ekibimizle, öğrencilerin başarısı için çalışıyoruz.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600 dark:text-slate-300">Uzman Eğitmen</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-gray-600 dark:text-slate-300">Yıl Deneyim</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600 dark:text-slate-300">Başarılı Öğrenci</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

