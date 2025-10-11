'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Denemeler() {
  const [selectedCategory, setSelectedCategory] = useState('tyt');

  const categories = [
    { id: 'tyt', name: 'TYT Denemeleri' },
    { id: 'ayt', name: 'AYT Denemeleri' },
    { id: 'branş', name: 'Branş Denemeleri' }
  ];

  const denemePaketleri = {
    tyt: [
      {
        id: 1,
        title: 'TYT Genel Deneme Paketi',
        description: 'Temel Yeterlilik Testi için kapsamlı deneme paketi',
        questionCount: 120,
        duration: 135,
        price: 29.99,
        difficulty: 'Orta',
        subjects: ['Türkçe', 'Matematik', 'Fen Bilimleri', 'Sosyal Bilimler']
      },
      {
        id: 2,
        title: 'TYT Matematik Odaklı',
        description: 'Matematik ağırlıklı TYT deneme paketi',
        questionCount: 120,
        duration: 135,
        price: 24.99,
        difficulty: 'Zor',
        subjects: ['Matematik', 'Geometri', 'Türkçe', 'Fen Bilimleri']
      },
      {
        id: 3,
        title: 'TYT Hızlandırılmış',
        description: 'Hızlı çözüm teknikleri ile TYT denemeleri',
        questionCount: 120,
        duration: 120,
        price: 19.99,
        difficulty: 'Kolay',
        subjects: ['Türkçe', 'Matematik', 'Fen Bilimleri', 'Sosyal Bilimler']
      }
    ],
    ayt: [
      {
        id: 4,
        title: 'AYT Sayısal Deneme Paketi',
        description: 'Sayısal öğrenciler için özel AYT deneme paketi',
        questionCount: 160,
        duration: 180,
        price: 39.99,
        difficulty: 'Zor',
        subjects: ['Matematik', 'Fizik', 'Kimya', 'Biyoloji']
      },
      {
        id: 5,
        title: 'AYT Eşit Ağırlık Paketi',
        description: 'Eşit ağırlık öğrencileri için AYT denemeleri',
        questionCount: 160,
        duration: 180,
        price: 39.99,
        difficulty: 'Orta',
        subjects: ['Matematik', 'Türk Dili ve Edebiyatı', 'Tarih', 'Coğrafya']
      },
      {
        id: 6,
        title: 'AYT Sözel Paketi',
        description: 'Sözel öğrenciler için kapsamlı AYT denemeleri',
        questionCount: 160,
        duration: 180,
        price: 39.99,
        difficulty: 'Orta',
        subjects: ['Türk Dili ve Edebiyatı', 'Tarih', 'Coğrafya', 'Felsefe']
      }
    ],
    branş: [
      {
        id: 7,
        title: 'Matematik Branş Denemeleri',
        description: 'Sadece matematik sorularından oluşan deneme paketi',
        questionCount: 40,
        duration: 60,
        price: 14.99,
        difficulty: 'Orta',
        subjects: ['Matematik', 'Geometri']
      },
      {
        id: 8,
        title: 'Fizik Branş Denemeleri',
        description: 'Fizik konularına odaklanmış deneme paketi',
        questionCount: 40,
        duration: 60,
        price: 14.99,
        difficulty: 'Zor',
        subjects: ['Fizik']
      },
      {
        id: 9,
        title: 'Türkçe Branş Denemeleri',
        description: 'Türkçe dil bilgisi ve anlam bilgisi denemeleri',
        questionCount: 40,
        duration: 60,
        price: 14.99,
        difficulty: 'Orta',
        subjects: ['Türkçe']
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Deneme Sınavları
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            YKS hazırlığınız için kaliteli deneme sınavları. 
            Gerçek sınav deneyimi yaşayın ve performansınızı ölçün.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                Deneme Kategorileri
              </h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {categories.find(cat => cat.id === selectedCategory)?.name}
              </h2>
              <p className="text-gray-600">
                {selectedCategory === 'tyt' && 'Temel Yeterlilik Testi deneme sınavları'}
                {selectedCategory === 'ayt' && 'Alan Yeterlilik Testi deneme sınavları'}
                {selectedCategory === 'branş' && 'Branş bazlı deneme sınavları'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {denemePaketleri[selectedCategory].map((deneme) => (
                <div key={deneme.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {deneme.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        deneme.difficulty === 'Kolay' ? 'bg-green-100 text-green-800' :
                        deneme.difficulty === 'Orta' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {deneme.difficulty}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4">
                      {deneme.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {deneme.questionCount}
                        </div>
                        <div className="text-sm text-gray-600">Soru</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {deneme.duration}
                        </div>
                        <div className="text-sm text-gray-600">Dakika</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Konular:</h4>
                      <div className="flex flex-wrap gap-2">
                        {deneme.subjects.map((subject, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold text-gray-900">
                        ₺{deneme.price}
                      </div>
                      <Link
                        href={`/deneme/${deneme.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Denemeye Başla
                      </Link>
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
