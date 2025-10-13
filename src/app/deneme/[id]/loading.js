export default function LoadingDeneme() {
  return (
    <div className="min-h-[30vh] flex items-center justify-center text-slate-600 dark:text-slate-300">
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 border-2 border-slate-300 dark:border-slate-600 border-t-blue-600 rounded-full animate-spin" />
        <span>Deneme yükleniyor...</span>
      </div>
    </div>
  );
}


