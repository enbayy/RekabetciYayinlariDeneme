'use client';

export default function DenemeError({ error, reset }) {
  return (
    <div className="min-h-[30vh] flex flex-col items-center justify-center text-center px-6">
      <h2 className="text-xl font-semibold text-red-600 mb-2">Deneme yüklenirken hata oluştu</h2>
      <p className="text-slate-600 dark:text-slate-300 mb-4">Lütfen tekrar deneyin.</p>
      <button
        onClick={reset}
        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
      >
        Yeniden Dene
      </button>
    </div>
  );
}


