export default function Loading() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center text-slate-600 dark:text-slate-300">
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 border-2 border-slate-300 dark:border-slate-600 border-t-blue-600 rounded-full animate-spin" />
        <span>Yükleniyor...</span>
      </div>
    </div>
  );
}


