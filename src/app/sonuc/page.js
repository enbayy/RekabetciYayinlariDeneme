'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Sonuc() {
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem('examResults');
    if (data) {
      setExamData(JSON.parse(data));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Sonuçlar yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!examData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Sonuç Bulunamadı
          </h1>
          <p className="text-gray-600 mb-6">
            Henüz bir sınav tamamlamadınız.
          </p>
          <Link
            href="/denemeler"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Denemelere Git
          </Link>
        </div>
      </div>
    );
  }

  // Sonuç hesaplamaları
  const totalQuestions = examData.questions.length;
  let correctAnswers = 0;
  let wrongAnswers = 0;
  
  for (let i = 0; i < examData.questions.length; i++) {
    if (examData.answers[i] === examData.questions[i].correctAnswer) {
      correctAnswers++;
    } else if (examData.answers[i] !== undefined) {
      wrongAnswers++;
    }
  }
  
  const emptyAnswers = totalQuestions - correctAnswers - wrongAnswers;
  
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  const totalTimeSpent = Math.floor(examData.totalTime / 60); // dakika cinsinden

  // Konu bazlı performans
  const subjectPerformance = {};
  for (let i = 0; i < examData.questions.length; i++) {
    const question = examData.questions[i];
    if (!subjectPerformance[question.subject]) {
      subjectPerformance[question.subject] = { correct: 0, total: 0 };
    }
    subjectPerformance[question.subject].total++;
    if (examData.answers[i] === question.correctAnswer) {
      subjectPerformance[question.subject].correct++;
    }
  }

  // Sıralama simülasyonu (gerçek uygulamada API'den gelecek)
  const rank = Math.floor(Math.random() * 1000) + 1;
  const totalParticipants = 1500;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sınav Sonuçları
          </h1>
          <p className="text-xl text-gray-600">
            Deneme sınavınız tamamlandı. Performansınızı inceleyin.
          </p>
        </div>

        {/* Overall Score */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center">
            <div className="text-6xl font-bold text-blue-600 mb-2">
              {score}
            </div>
            <div className="text-2xl text-gray-600 mb-6">
              Puan
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {correctAnswers}
                </div>
                <div className="text-gray-600">Doğru</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-1">
                  {wrongAnswers}
                </div>
                <div className="text-gray-600">Yanlış</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-600 mb-1">
                  {emptyAnswers}
                </div>
                <div className="text-gray-600">Boş</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {totalTimeSpent}
                </div>
                <div className="text-gray-600">Dakika</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ranking */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Sıralama
            </h2>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                #{rank}
              </div>
              <div className="text-gray-600 mb-4">
                {totalParticipants} kişi arasında
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-blue-800">
                  <strong>Yüzdelik Dilim:</strong> %{Math.round((rank / totalParticipants) * 100)}
                </div>
              </div>
            </div>
          </div>

          {/* Subject Performance */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Konu Bazlı Performans
            </h2>
            <div className="space-y-4">
              {Object.entries(subjectPerformance).map(([subject, data]) => {
                const percentage = Math.round((data.correct / data.total) * 100);
                return (
                  <div key={subject} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{subject}</span>
                      <span className="text-sm text-gray-600">
                        {data.correct}/{data.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      %{percentage}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Question Analysis */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Soru Analizi
          </h2>
          <div className="space-y-4">
            {examData.questions.map((question, index) => {
              const userAnswer = examData.answers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              const timeSpent = examData.questionTimes[index] || 0;
              
              return (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Soru {index + 1} - {question.subject}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {isCorrect ? 'Doğru' : 'Yanlış'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-900 mb-2">{question.question}</p>
                  <div className="space-y-1">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`text-sm p-2 rounded ${
                          optionIndex === question.correctAnswer
                            ? 'bg-green-50 text-green-800'
                            : optionIndex === userAnswer && !isCorrect
                            ? 'bg-red-50 text-red-800'
                            : 'bg-gray-50 text-gray-600'
                        }`}
                      >
                        {option}
                        {optionIndex === question.correctAnswer && (
                          <span className="ml-2 text-green-600 font-medium">✓ Doğru Cevap</span>
                        )}
                        {optionIndex === userAnswer && !isCorrect && (
                          <span className="ml-2 text-red-600 font-medium">✗ Sizin Cevabınız</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="text-center mt-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/denemeler"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Yeni Deneme
            </Link>
            <button
              onClick={() => window.print()}
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Sonucu Yazdır
            </button>
            <Link
              href="/"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
