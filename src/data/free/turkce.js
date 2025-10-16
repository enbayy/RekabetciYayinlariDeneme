'use client';

// Ücretsiz Türkçe branş denemesi (örnek veri)
const turkceFreeQuestions = [
  {
    id: 1,
    question:
      `Aşağıdaki cümlelerin hangisinde "de" bağlacı ayrı yazılmalıdır?`,
    options: [
      'A) Sende gel, birlikte gideriz.',
      'B) O da bu akşam bize gelecek.',
      'C) Kitapda çok ilginç bilgiler var.',
      'D) Hem ben de hem sen çalışmalıyız.',
      'E) Onlarda bizimle geldi.'
    ],
    correctAnswer: 1,
    subject: 'Türkçe'
  },
  {
    id: 2,
    question:
      `Numaralanmış cümlelerden hangisinde anlatım bozukluğu vardır?\n(I) Dün akşam arkadaşlarımla film izledim.\n(II) Film gerçekten çok etkileyiciydi.\n(III) Oyuncuların performansı ve müzikleri harikaydı.\n(IV) Ayrıca kurgu ve yönetmen de çok beğendim.\n(V) Finali beklediğimden farklıydı.`,
    options: ['A) I', 'B) II', 'C) III', 'D) IV', 'E) V'],
    correctAnswer: 3,
    subject: 'Türkçe'
  },
  {
    id: 3,
    question:
      `Aşağıdaki cümlelerin hangisinde üslü anlatım ağır basmaktadır?`,
    options: [
      'A) Gün doğarken şehir bir masal gibi uyanır.',
      'B) Sabahları işe giderken erken kalkarım.',
      'C) Toplantı saat 9:00’da başlayacak.',
      'D) Bu kitabı iki günde bitirdim.',
      'E) Dün hava biraz serindi.'
    ],
    correctAnswer: 0,
    subject: 'Türkçe'
  }
];

export default turkceFreeQuestions;

