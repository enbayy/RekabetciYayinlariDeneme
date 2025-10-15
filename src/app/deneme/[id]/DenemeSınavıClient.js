'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DenemeSınavıClient({ params }) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const isFreeTYT = String(params?.id) === '10';

  // Süre: Ücretsiz TYT deneme 50 dk, diğerleri 135 dk
  const initialDurationSeconds = isFreeTYT ? 50 * 60 : 135 * 60;
  const [timeLeft, setTimeLeft] = useState(initialDurationSeconds);
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [questionTimes, setQuestionTimes] = useState({});
  const [questionStartTimes, setQuestionStartTimes] = useState({});
  const [examStartTime, setExamStartTime] = useState(null);

  // Örnek sorular
  const questions = (function buildQuestions() {
    if (isFreeTYT) {
      const subjectsPool = ["Türkçe", "Matematik", "Fen Bilimleri", "Sosyal Bilimler"];
      const arr = [];
      for (let i = 1; i <= 40; i++) {
        const subject = subjectsPool[(i - 1) % subjectsPool.length];
        arr.push({
          id: i,
          question: `Soru ${i}: ${subject} alanında örnek çoktan seçmeli soru metni.`,
          options: [
            "A) Seçenek A",
            "B) Seçenek B",
            "C) Seçenek C",
            "D) Seçenek D"
          ],
          correctAnswer: (i - 1) % 4,
          subject
        });
      }
      return arr;
    }
    return [
      {
        id: 1,
        question: "Aşağıdaki cümlelerin hangisinde 'de' bağlacı yanlış yazılmıştır?",
        options: [
          "A) Sen de gel, biz de gelelim.",
          "B) Kitap da okurum, dergi de.",
          "C) O da geldi, ben de gittim.",
          "D) Hem sen de hem ben de çalışırız."
        ],
        correctAnswer: 1,
        subject: "Türkçe"
      },
      {
        id: 2,
        question: "2x + 3y = 12 denkleminin çözümü aşağıdakilerden hangisidir?",
        options: [
          "A) x = 3, y = 2",
          "B) x = 2, y = 3", 
          "C) x = 6, y = 0",
          "D) x = 0, y = 4"
        ],
        correctAnswer: 0,
        subject: "Matematik"
      },
      {
        id: 3,
        question: "Hangi element periyodik tabloda 1. periyotta yer alır?",
        options: [
          "A) Hidrojen",
          "B) Lityum",
          "C) Sodyum",
          "D) Potasyum"
        ],
        correctAnswer: 0,
        subject: "Kimya"
      },
      {
        id: 4,
        question: "Osmanlı Devleti'nin kurucusu kimdir?",
        options: [
          "A) Orhan Gazi",
          "B) Osman Gazi",
          "C) Mehmet Çelebi",
          "D) Murat Hüdavendigar"
        ],
        correctAnswer: 1,
        subject: "Tarih"
      },
      {
        id: 5,
        question: "Türkiye'nin en yüksek dağı hangisidir?",
        options: [
          "A) Erciyes Dağı",
          "B) Süphan Dağı",
          "C) Ağrı Dağı",
          "D) Kaçkar Dağı"
        ],
        correctAnswer: 2,
        subject: "Coğrafya"
      }
    ];
  })();

  // Timer efekti
  useEffect(() => {
    if (isExamStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      finishExam();
    }
  }, [isExamStarted, timeLeft]);

  // Soru başlangıç zamanını kaydetme
  useEffect(() => {
    if (isExamStarted && examStartTime) {
      const currentTime = Date.now();
      
      // Önceki sorunun zamanını kaydet
      if (currentQuestion > 0) {
        const previousQuestion = currentQuestion - 1;
        if (questionStartTimes[previousQuestion]) {
          const timeSpent = Math.floor((currentTime - questionStartTimes[previousQuestion]) / 1000);
          const newQuestionTimes = Object.assign({}, questionTimes);
          newQuestionTimes[previousQuestion] = timeSpent;
          setQuestionTimes(newQuestionTimes);
        }
      }
      
      // Mevcut sorunun başlangıç zamanını kaydet
      const newStartTimes = Object.assign({}, questionStartTimes);
      newStartTimes[currentQuestion] = currentTime;
      setQuestionStartTimes(newStartTimes);
    }
  }, [currentQuestion, isExamStarted, examStartTime]);

  function startExam() {
    setIsExamStarted(true);
    setExamStartTime(Date.now());
    
    // İlk sorunun başlangıç zamanını kaydet
    const currentTime = Date.now();
    const newStartTimes = Object.assign({}, questionStartTimes);
    newStartTimes[0] = currentTime;
    setQuestionStartTimes(newStartTimes);
  }

  function finishExam() {
    // Son sorunun zamanını kaydet
    const currentTime = Date.now();
    if (questionStartTimes[currentQuestion]) {
      const timeSpent = Math.floor((currentTime - questionStartTimes[currentQuestion]) / 1000);
      const newQuestionTimes = Object.assign({}, questionTimes);
      newQuestionTimes[currentQuestion] = timeSpent;
      setQuestionTimes(newQuestionTimes);
    }
    
    const examData = {
      answers: answers,
      questionTimes: questionTimes,
      totalTime: 135 * 60 - timeLeft,
      questions: questions
    };
    
    // Sonuçları localStorage'a kaydet
    localStorage.setItem('examResults', JSON.stringify(examData));
    
    // Sonuç sayfasına yönlendir
    router.push('/sonuc');
  }

  function handleAnswerSelect(answerIndex) {
    const newAnswers = Object.assign({}, answers);
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  }

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + secs.toString().padStart(2, '0');
  }

  function goToQuestion(questionIndex) {
    // Mevcut sorunun zamanını kaydet
    const currentTime = Date.now();
    if (questionStartTimes[currentQuestion]) {
      const timeSpent = Math.floor((currentTime - questionStartTimes[currentQuestion]) / 1000);
      const newQuestionTimes = Object.assign({}, questionTimes);
      newQuestionTimes[currentQuestion] = timeSpent;
      setQuestionTimes(newQuestionTimes);
    }
    
    // Yeni sorunun başlangıç zamanını kaydet
    const newStartTimes = Object.assign({}, questionStartTimes);
    newStartTimes[questionIndex] = currentTime;
    setQuestionStartTimes(newStartTimes);
    
    setCurrentQuestion(questionIndex);
  }

  if (!isExamStarted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center text-gray-900 dark:text-slate-100">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 max-w-md w-full mx-4 border border-transparent dark:border-slate-700">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4">
              Deneme Sınavı Hazırlığı
            </h1>
            <div className="mb-6">
              <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 mb-4">
                <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">
                  Sınav Bilgileri
                </h2>
                <div className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                  <p><strong>Soru Sayısı:</strong> {questions.length}</p>
                  <p><strong>Süre:</strong> {Math.floor(initialDurationSeconds / 60)} dakika</p>
                  <p><strong>Konular:</strong> {Array.from(new Set(questions.map(q => q.subject))).join(', ')}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-900 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                Önemli Uyarılar:
              </h3>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 text-left space-y-1">
                <li>• Sınav başladıktan sonra durdurulamaz</li>
                <li>• Süre bittiğinde sınav otomatik sonlanır</li>
                <li>• Sorular arasında geçiş yapabilirsiniz</li>
                <li>• Cevap vermediğiniz sorular boş sayılır</li>
              </ul>
            </div>

            <button
              onClick={startExam}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Denemeye Başla
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-slate-100">
      {/* Header */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
                Deneme Sınavı
              </h1>
              <p className="text-sm text-gray-600 dark:text-slate-300">
                Soru {currentQuestion + 1} / {questions.length}
              </p>
            </div>
            
            {/* Timer */}
            <div className="flex items-center space-x-4">
              <div className={'px-4 py-2 rounded-lg font-mono text-lg font-bold ' + (
                timeLeft < 600 ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200' : 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300'
              )}>
                {formatTime(timeLeft)}
              </div>
              <button
                onClick={finishExam}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Sınavı Bitir
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Question Area */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-transparent dark:border-slate-700">
              <div className="mb-4">
                <span className="bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                  {questions[currentQuestion].subject}
                </span>
              </div>
              
              <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-6">
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-3">
                {questions[currentQuestion].options.map(function(option, index) {
                  return (
                    <label
                      key={index}
                      className={'flex items-center p-4 rounded-lg border-2 cursor-pointer transition-colors ' + (
                        answers[currentQuestion] === index
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                          : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-500'
                      )}
                    >
                      <input
                        type="radio"
                        name={'question-' + currentQuestion}
                        value={index}
                        checked={answers[currentQuestion] === index}
                        onChange={function() {
                          handleAnswerSelect(index);
                        }}
                        className="sr-only"
                      />
                      <span className="text-gray-900 dark:text-slate-100">{option}</span>
                    </label>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={function() {
                    if (currentQuestion > 0) {
                      goToQuestion(currentQuestion - 1);
                    }
                  }}
                  disabled={currentQuestion === 0}
                  className="px-6 py-2 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-100 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                >
                  Önceki Soru
                </button>
                <button
                  onClick={function() {
                    if (currentQuestion < questions.length - 1) {
                      goToQuestion(currentQuestion + 1);
                    }
                  }}
                  disabled={currentQuestion === questions.length - 1}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                >
                  Sonraki Soru
                </button>
              </div>
            </div>
          </div>

          {/* Question Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-transparent dark:border-slate-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">
                Soru Navigasyonu
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {questions.map(function(_, index) {
                  return (
                    <button
                      key={index}
                      onClick={function() {
                        goToQuestion(index);
                      }}
                      className={'w-10 h-10 rounded-lg font-medium text-sm transition-colors ' + (
                        index === currentQuestion
                          ? 'bg-blue-600 text-white'
                          : answers[index] !== undefined
                          ? 'bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300'
                          : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-600'
                      )}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>
                  <span>Mevcut Soru</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-100 dark:bg-green-950 rounded mr-2"></div>
                  <span>Cevaplanan</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-100 dark:bg-slate-700 rounded mr-2"></div>
                  <span>Cevaplanmamış</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

