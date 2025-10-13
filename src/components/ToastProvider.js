'use client';

import { createContext, useContext, useState } from 'react';
import clsx from 'clsx';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function addToast(message, type = 'info', duration = 3000) {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-[64px] left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center gap-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={clsx(
              'px-4 py-2 rounded shadow-lg text-white animate-fadeIn',
              toast.type === 'success' && 'bg-green-500',
              toast.type === 'error' && 'bg-red-500',
              toast.type === 'info' && 'bg-blue-500'
            )}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
