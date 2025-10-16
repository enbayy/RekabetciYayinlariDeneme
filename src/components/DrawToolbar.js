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
    <div className="flex flex-wrap md:flex-nowrap items-center gap-2 mb-4 p-3">
      {/* Görünürlük Butonu */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className={`px-2 py-1 rounded border text-sm flex items-center justify-center whitespace-nowrap transition-all duration-200 ${
          isVisible
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-transparent border-slate-300 dark:border-slate-600'
        }`}
      >
        {isVisible ? 'Çizimi Gizle' : 'Çizimi Göster'}
      </button>

      {/* Aktiflik Butonu */}
      <button
        onClick={() => setIsActive(!isActive)}
        className={`px-2 py-1 rounded border text-sm flex items-center justify-center whitespace-nowrap transition-all duration-200 ${
          isActive
            ? 'bg-emerald-600 text-white border-emerald-600'
            : 'bg-transparent border-slate-300 dark:border-slate-600'
        }`}
      >
        {isActive ? 'Çizim: Açık' : 'Çizim: Kapalı'}
      </button>

      {/* Araç Seçimi */}
      <div className="flex items-center gap-1">
        <label className="text-sm whitespace-nowrap">Araç:</label>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setTool('pen')}
            title="Kalem"
            className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full text-xl transition-all duration-200 ${
              tool === 'pen'
                ? 'bg-blue-500 text-white scale-110 shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ✏️
          </button>
          <button
            onClick={() => setTool('eraser1')}
            title="Silgi 1"
            className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full text-xl transition-all duration-200 ${
              tool === 'eraser1'
                ? 'bg-red-500 text-white scale-110 shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🩹
          </button>
          <button
            onClick={() => setTool('eraser2')}
            title="Silgi 2"
            className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full text-xl transition-all duration-200 ${
              tool === 'eraser2'
                ? 'bg-red-500 text-white scale-110 shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🧽
          </button>
        </div>
      </div>

      {/* Renk Seçimi */}
      <div className="flex items-center gap-1">
        <label className="text-sm whitespace-nowrap">Renk:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-6 h-6 md:w-8 md:h-8 p-0 border rounded bg-transparent border-slate-300 dark:border-slate-600"
        />
      </div>

      {/* Kalınlık */}
      <div className="flex items-center gap-1">
        <label className="text-sm whitespace-nowrap">Kalınlık:</label>
        <input
          type="range"
          min="1"
          max="12"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-20 md:w-24 accent-blue-600"
        />
        <span className="text-xs w-5 text-center">{size}</span>
      </div>

      {/* Geri Al / Temizle */}
      <button
        onClick={onUndo}
        className="px-2 py-1 rounded border text-sm bg-transparent border-slate-300 dark:border-slate-600 hover:bg-gray-100 flex items-center justify-center whitespace-nowrap"
      >
        Geri Al
      </button>
      <button
        onClick={onClear}
        className="px-2 py-1 rounded border text-sm bg-transparent border-slate-300 dark:border-slate-600 hover:bg-gray-100 flex items-center justify-center whitespace-nowrap"
      >
        Temizle
      </button>
    </div>
  );
}
