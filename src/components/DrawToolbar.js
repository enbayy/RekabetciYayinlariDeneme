'use client';

export default function DrawToolbar({
  isVisible,
  setIsVisible,
  isActive,
  setIsActive,
  tool,
  setTool,
  color,
  setColor,
  size,
  setSize,
  onUndo,
  onClear
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap mb-4">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className={`px-3 py-1.5 rounded border text-sm ${
          isVisible ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600'
        }`}
      >
        {isVisible ? 'Çizimi Gizle' : 'Çizimi Göster'}
      </button>
      <button
        onClick={() => setIsActive(!isActive)}
        className={`px-3 py-1.5 rounded border text-sm ${
          isActive ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600'
        }`}
      >
        {isActive ? 'Çizim: Açık' : 'Çizim: Kapalı'}
      </button>
      <div className="flex items-center gap-2">
        <label className="text-sm">Araç:</label>
        <select
          value={tool}
          onChange={(e) => setTool(e.target.value)}
          className="px-2 py-1 rounded border bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-sm"
        >
          <option value="pen">Kalem</option>
          <option value="eraser">Silgi</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm">Renk:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-8 h-8 p-0 border rounded bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm">Kalınlık:</label>
        <input
          type="range"
          min="1"
          max="12"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="accent-blue-600"
        />
        <span className="text-xs w-6 text-center">{size}</span>
      </div>
      <button
        onClick={onUndo}
        className="px-3 py-1.5 rounded border text-sm bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600"
      >
        Geri Al
      </button>
      <button
        onClick={onClear}
        className="px-3 py-1.5 rounded border text-sm bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600"
      >
        Temizle
      </button>
    </div>
  );
}


