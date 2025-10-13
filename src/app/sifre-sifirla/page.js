'use client';

import { useState } from 'react';
import { auth } from '@/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useToast } from '@/components/ToastProvider';
import Link from 'next/link';

export default function SifreSifirla() {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email.trim()) {
      setError('E-posta alanı zorunludur');
      setIsLoading(false);
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Geçerli bir e-posta adresi girin');
      setIsLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      addToast('Şifre sıfırlama e-postası gönderildi!', 'success');
      setEmail('');
    } catch (err) {
      console.error('Password reset error:', err);
      let message = 'Bir hata oluştu.';
      if (err.code === 'auth/user-not-found') message = 'Bu e-posta ile kayıtlı kullanıcı bulunamadı.';
      addToast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center py-8">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md border border-transparent dark:border-slate-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4">Şifre Sıfırla</h1>
        <p className="text-gray-600 dark:text-slate-300 mb-6">
          Şifrenizi sıfırlamak için kayıtlı e-posta adresinizi girin.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="E-posta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 ${
                error ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
              }`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {isLoading ? 'Gönderiliyor...' : 'Şifre Sıfırlama Maili Gönder'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-slate-300">
          Hatırlıyor musunuz? <Link href="/giris-yap" className="text-blue-600 hover:underline">Giriş Yap</Link>
        </p>
      </div>
    </div>
  );
}
